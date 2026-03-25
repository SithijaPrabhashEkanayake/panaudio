# 🚀 Maximum Free Resources Deployment Guide
## Cloudflare Pages + Fly.io + Supabase + ImageKit

This guide shows you how to deploy Pan Audio with the **most generous free tiers** available.

---

## 📊 What You Get FREE

| Service | Free Tier | Limits |
|---------|-----------|--------|
| **Cloudflare Pages** | Unlimited bandwidth | 500 builds/month |
| **Fly.io** | 3 VMs (256MB each) | 160GB bandwidth/month |
| **Supabase** | PostgreSQL 500MB | Unlimited API requests |
| **ImageKit** | 20GB bandwidth/month | 20GB storage |

**Total Cost:** $0/month (credit card required for Fly.io only)

---

## ⚙️ Prerequisites

### Accounts Needed
1. **Cloudflare** - https://dash.cloudflare.com/sign-up
2. **Fly.io** - https://fly.io/app/sign-up (requires credit card, but won't charge)
3. **Supabase** - https://supabase.com (GitHub sign-in)
4. **ImageKit** - https://imagekit.io/registration (email sign-up)
5. **GitHub** - For code repository

---

## 🗄️ Part 1: Set Up Supabase (Database)

### Step 1: Create Supabase Project

1. Go to https://supabase.com
2. Click **"New Project"**
3. Configure:
   - **Name**: panaudio-production
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your users
4. Click **"Create new project"** (takes 2-3 minutes)

### Step 2: Create Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Paste this SQL:

```sql
-- Products table
CREATE TABLE products (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    brand VARCHAR(255) NOT NULL,
    category VARCHAR(255) NOT NULL,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Projects table
CREATE TABLE projects (
    id VARCHAR(255) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    client VARCHAR(255),
    category VARCHAR(255) NOT NULL,
    scope TEXT,
    description TEXT,
    featured BOOLEAN DEFAULT false,
    image TEXT,
    created_at TIMESTAMP DEFAULT NOW(),
    updated_at TIMESTAMP DEFAULT NOW()
);

-- Admin users table
CREATE TABLE admin_users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW(),
    last_login TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_products_category ON products(category);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_projects_category ON projects(category);
CREATE INDEX idx_projects_featured ON projects(featured);

-- Function to auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Triggers
CREATE TRIGGER update_products_updated_at 
    BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_projects_updated_at 
    BEFORE UPDATE ON projects
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();
```

4. Click **"Run"**

### Step 3: Get Connection String

1. In Supabase dashboard, go to **Settings** → **Database**
2. Under **Connection string**, find **URI**
3. Copy the connection string (looks like):
   ```
   postgresql://postgres:[YOUR-PASSWORD]@db.xxxxxxxxxxxxx.supabase.co:5432/postgres
   ```
4. **Save this** - you'll need it for Fly.io

### Step 4: Disable RLS (Row Level Security) for Admin

For admin operations, disable RLS on tables:

1. Go to **Authentication** → **Policies**
2. For each table (products, projects, admin_users):
   - Click table name
   - Toggle **"Enable RLS"** to OFF
   - Or create policies if you want granular control

---

## 🖼️ Part 2: Set Up ImageKit (Image CDN)

### Step 1: Create ImageKit Account

1. Go to https://imagekit.io/registration
2. Sign up with email
3. Verify email

### Step 2: Get Credentials

1. In ImageKit dashboard, go to **Developer Options**
2. Copy these values:
   ```
   URL Endpoint: https://ik.imagekit.io/your-id
   Public Key: public_xxxxxxxxxxxxx
   Private Key: private_xxxxxxxxxxxxx
   ```
3. Save these for backend configuration

### Step 3: Create Upload Folders

1. Go to **Media Library**
2. Create folders:
   - `panaudio/products`
   - `panaudio/projects`

---

## 🛠️ Part 3: Prepare Backend for Fly.io

### Step 1: Update Backend for ImageKit

Create `server/config/imagekit.js`:

```javascript
import ImageKit from 'imagekit';
import multer from 'multer';

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Multer memory storage (don't save to disk)
const storage = multer.memoryStorage();

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type'));
        }
    }
});

// Upload function
export const uploadToImageKit = async (file, folder = 'panaudio') => {
    try {
        const result = await imagekit.upload({
            file: file.buffer,
            fileName: `${Date.now()}-${file.originalname}`,
            folder: folder,
            useUniqueFileName: true,
            transformation: {
                pre: 'l-image,i-watermark.png,l-end', // Optional watermark
                post: [
                    {
                        type: 'transformation',
                        value: 'w-1920,h-1080,c-at_max,q-80,f-auto'
                    }
                ]
            }
        });
        
        return result.url;
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw error;
    }
};

// Delete function
export const deleteFromImageKit = async (imageUrl) => {
    try {
        // Extract fileId from URL
        const fileId = imageUrl.split('/').pop().split('?')[0];
        await imagekit.deleteFile(fileId);
        console.log('Deleted image:', fileId);
    } catch (error) {
        console.error('ImageKit delete error:', error);
    }
};

export default imagekit;
```

### Step 2: Update server-production.js

Replace Cloudinary imports with ImageKit:

```javascript
import { upload, uploadToImageKit, deleteFromImageKit } from './config/imagekit.js';

// In POST /api/products route:
app.post('/api/products', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { name, brand, category, description, featured } = req.body;
        
        let imageUrl = null;
        if (req.file) {
            imageUrl = await uploadToImageKit(req.file, 'panaudio/products');
        }
        
        const result = await query(
            `INSERT INTO products (id, name, brand, category, description, featured, image)
             VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *`,
            [`prod-${Date.now()}`, name, brand, category, description || '', 
             featured === 'true', imageUrl]
        );
        
        res.status(201).json(result.rows[0]);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ success: false, message: 'Error creating product' });
    }
});

// Similar updates for PUT and DELETE routes
```

### Step 3: Update package.json

Add ImageKit dependency:

```json
{
  "dependencies": {
    "imagekit": "^4.1.3",
    // ... other dependencies
  }
}
```

### Step 4: Install Fly CLI

**On Windows:**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**On Mac/Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

### Step 5: Create fly.toml Configuration

In your `server/` directory, create `fly.toml`:

```toml
app = "panaudio-backend"
primary_region = "sin"  # Singapore (closest to Sri Lanka)

[build]
  [build.args]
    NODE_VERSION = "18"

[env]
  PORT = "8080"
  NODE_ENV = "production"

[http_service]
  internal_port = 8080
  force_https = true
  auto_stop_machines = false
  auto_start_machines = true
  min_machines_running = 1

  [http_service.concurrency]
    type = "requests"
    soft_limit = 200
    hard_limit = 250

[[services]]
  http_checks = []
  internal_port = 8080
  protocol = "tcp"
  script_checks = []

  [services.concurrency]
    hard_limit = 250
    soft_limit = 200
    type = "requests"

  [[services.ports]]
    force_https = true
    handlers = ["http"]
    port = 80

  [[services.ports]]
    handlers = ["tls", "http"]
    port = 443

  [[services.tcp_checks]]
    grace_period = "10s"
    interval = "15s"
    restart_limit = 0
    timeout = "2s"

  [[services.http_checks]]
    interval = "10s"
    grace_period = "5s"
    method = "get"
    path = "/health"
    protocol = "http"
    timeout = "2s"
    tls_skip_verify = false
```

### Step 6: Create Dockerfile

In `server/` directory, create `Dockerfile`:

```dockerfile
FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --only=production

# Copy application code
COPY . .

# Expose port
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=10s --retries=3 \
  CMD node -e "require('http').get('http://localhost:8080/health', (r) => {process.exit(r.statusCode === 200 ? 0 : 1)})"

# Start application
CMD ["node", "server-production.js"]
```

---

## ✈️ Part 4: Deploy Backend to Fly.io

### Step 1: Login to Fly.io

```bash
cd server
fly auth login
```

This opens a browser window to authenticate.

### Step 2: Launch Fly App

```bash
fly launch
```

Answer the prompts:
- **App name**: panaudio-backend (or auto-generated)
- **Region**: Singapore (sin) or closest to you
- **PostgreSQL**: NO (we're using Supabase)
- **Redis**: NO

This creates `fly.toml` if it doesn't exist.

### Step 3: Set Environment Variables

```bash
# Database (from Supabase)
fly secrets set DATABASE_URL="postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres"

# ImageKit
fly secrets set IMAGEKIT_PUBLIC_KEY="public_xxxxx"
fly secrets set IMAGEKIT_PRIVATE_KEY="private_xxxxx"
fly secrets set IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-id"

# JWT Authentication
fly secrets set JWT_SECRET="your-random-32-char-secret"

# Admin credentials
fly secrets set ADMIN_USERNAME="admin"
fly secrets set ADMIN_PASSWORD="YourSecurePassword123!"

# CORS (will update after Cloudflare Pages deployment)
fly secrets set FRONTEND_URL="https://panaudio.pages.dev"

# Port
fly secrets set PORT="8080"
```

### Step 4: Deploy

```bash
fly deploy
```

Wait 2-3 minutes for deployment.

### Step 5: Get Your Fly.io URL

```bash
fly status
```

Your URL will be: `https://panaudio-backend.fly.dev`

### Step 6: Test Backend

```bash
# Health check
curl https://panaudio-backend.fly.dev/health

# Products API
curl https://panaudio-backend.fly.dev/api/products
```

### Step 7: Run Database Migration

```bash
# SSH into Fly.io machine
fly ssh console

# Inside the container:
node db/migrate.js

# Exit
exit
```

Or run migration locally with Supabase connection string.

---

## 🌐 Part 5: Deploy Frontend to Cloudflare Pages

### Step 1: Prepare Frontend

Update `src/config.js`:

```javascript
export const API_URL = import.meta.env.VITE_API_URL || 
    (import.meta.env.MODE === 'production' 
        ? 'https://panaudio-backend.fly.dev'  // Your Fly.io URL
        : 'http://localhost:5000'
    );
```

Or create `.env.production`:

```env
VITE_API_URL=https://panaudio-backend.fly.dev
```

### Step 2: Build Frontend Locally (Test)

```bash
npm run build
```

Verify `dist/` folder is created.

### Step 3: Push to GitHub

```bash
git add .
git commit -m "Ready for Cloudflare Pages deployment"
git push origin main
```

### Step 4: Create Cloudflare Pages Project

1. Go to https://dash.cloudflare.com
2. Select **Pages** in sidebar
3. Click **"Create a project"**
4. Click **"Connect to Git"**
5. Authorize Cloudflare to access GitHub
6. Select your `panaudio` repository

### Step 5: Configure Build Settings

- **Production branch**: `main`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
- **Root directory**: `/` (leave empty for root)

**Environment variables:**
Click **"Add variable"**:
```
VITE_API_URL = https://panaudio-backend.fly.dev
```

### Step 6: Deploy

Click **"Save and Deploy"**

Wait 2-3 minutes for deployment.

### Step 7: Get Your Cloudflare Pages URL

After deployment, you'll get a URL like:
```
https://panaudio.pages.dev
```

Or a random one like:
```
https://panaudio-abc123.pages.dev
```

---

## 🔗 Part 6: Connect Frontend and Backend (CORS)

### Update Fly.io CORS

```bash
fly secrets set FRONTEND_URL="https://panaudio.pages.dev"
```

This updates the CORS whitelist in your backend.

### Restart Fly.io App

```bash
fly apps restart panaudio-backend
```

---

## 🧪 Part 7: Test Everything

### Test Health Endpoint

```bash
curl https://panaudio-backend.fly.dev/health
```

Expected:
```json
{"status":"ok","timestamp":"2026-03-25T...","environment":"production"}
```

### Test Authentication

```bash
curl -X POST https://panaudio-backend.fly.dev/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YourSecurePassword123!"}'
```

Expected:
```json
{"success":true,"token":"eyJhbGc...","user":{"id":1,"username":"admin"}}
```

### Test Frontend

1. Visit `https://panaudio.pages.dev`
2. Browse products and projects
3. Try admin login
4. Upload a product with image
5. Verify image loads from ImageKit

---

## 🎨 Part 8: Custom Domain (Optional)

### Connect Domain to Cloudflare Pages

1. In Cloudflare dashboard, go to **Pages** → Your project
2. Click **"Custom domains"** tab
3. Click **"Set up a custom domain"**
4. Enter: `www.panaudio.com`
5. Cloudflare will automatically configure DNS

### Connect Domain to Fly.io Backend

1. In Cloudflare dashboard, go to **DNS**
2. Add CNAME record:
   ```
   Type: CNAME
   Name: api
   Target: panaudio-backend.fly.dev
   Proxy: ON (orange cloud)
   ```

3. Update Fly.io secrets:
   ```bash
   fly secrets set FRONTEND_URL="https://www.panaudio.com"
   ```

4. Update Cloudflare Pages environment variable:
   ```
   VITE_API_URL = https://api.panaudio.com
   ```

---

## 📊 Monitoring & Scaling

### Fly.io Monitoring

```bash
# Check app status
fly status

# View logs
fly logs

# View metrics
fly dashboard
```

### Cloudflare Analytics

1. Go to Cloudflare dashboard → Pages → Your project
2. Click **"Analytics"** tab
3. See traffic, bandwidth, requests

### Supabase Monitoring

1. Go to Supabase dashboard
2. Click **"Database"** → **"Usage"**
3. Monitor storage and queries

### ImageKit Monitoring

1. Go to ImageKit dashboard
2. Check **"Usage"** section
3. Monitor bandwidth and storage

---

## 🔄 Updating Your Site

### Update Backend

```bash
cd server
git pull
fly deploy
```

### Update Frontend

```bash
git pull
git add .
git commit -m "Update frontend"
git push
```

Cloudflare Pages auto-deploys on push!

---

## 💰 Free Tier Limits

### When You Hit Limits

**Fly.io** (3 VMs, 160GB/month):
- Upgrade: $1.94/month per additional VM
- Or optimize: Enable auto-stop machines

**Supabase** (500MB):
- Upgrade to Pro: $25/month for 8GB
- Or optimize: Delete old data

**ImageKit** (20GB bandwidth/month):
- Upgrade: $9/month for 60GB
- Or optimize: Use WebP, lower quality

**Cloudflare Pages** (500 builds/month):
- Unlimited bandwidth
- Free tier very generous

---

## 🆘 Troubleshooting

### Issue: Fly.io deployment fails

**Solution:**
```bash
# Check logs
fly logs

# SSH into machine
fly ssh console

# Restart app
fly apps restart panaudio-backend
```

### Issue: Database connection fails

**Solution:**
1. Check DATABASE_URL is correct
2. Verify Supabase database is active
3. Test connection:
   ```bash
   psql "postgresql://postgres:[PASSWORD]@db.xxxxx.supabase.co:5432/postgres"
   ```

### Issue: ImageKit upload fails

**Solution:**
1. Verify credentials in Fly.io secrets
2. Check ImageKit dashboard for errors
3. Test with curl:
   ```bash
   curl -X POST "https://upload.imagekit.io/api/v1/files/upload" \
     -u private_key: \
     -F "file=@test.jpg" \
     -F "fileName=test.jpg"
   ```

### Issue: CORS errors

**Solution:**
1. Update FRONTEND_URL in Fly.io
2. Restart Fly.io app
3. Clear browser cache

---

## ✅ Deployment Checklist

### Pre-Deployment
- [ ] Supabase project created
- [ ] Database schema created
- [ ] ImageKit account set up
- [ ] Fly.io CLI installed
- [ ] Code pushed to GitHub

### Deployment
- [ ] Backend deployed to Fly.io
- [ ] Environment variables set
- [ ] Database migration run
- [ ] Frontend deployed to Cloudflare Pages
- [ ] CORS configured

### Post-Deployment
- [ ] Health endpoint tested
- [ ] Authentication tested
- [ ] Products/projects load
- [ ] Image upload works
- [ ] No console errors

---

## 🎉 Success!

Your Pan Audio website is now live with:

✅ **Cloudflare Pages** - Ultra-fast global CDN, unlimited bandwidth
✅ **Fly.io** - 3 VMs, no sleep, 24/7 uptime  
✅ **Supabase** - 500MB PostgreSQL, unlimited API requests
✅ **ImageKit** - 20GB bandwidth, 20GB storage, CDN delivery

**Total Cost:** $0/month

**URLs:**
- Frontend: `https://panaudio.pages.dev`
- Backend: `https://panaudio-backend.fly.dev`

**Handles:** 5K-20K visitors/month on free tier!

---

## 📞 Support

- **Fly.io Community**: https://community.fly.io
- **Cloudflare Discord**: https://discord.cloudflare.com
- **Supabase Discord**: https://discord.supabase.com
- **ImageKit Support**: https://imagekit.io/support

---

*Deployment Guide Generated: March 2026*  
*Stack: Cloudflare Pages + Fly.io + Supabase + ImageKit*  
*Time to Deploy: 60-90 minutes*  
*Cost: $0/month*
