# Vercel Serverless Functions Setup Guide

## ✅ Conversion Complete

Your Express.js backend has been successfully converted to Vercel Serverless Functions with MongoDB Atlas as the database.

---

## 📁 Project Structure

```
api/
├── lib/
│   └── db.js                 # MongoDB connection handler
├── login.js                  # POST /api/login - Admin authentication
├── upload/
│   └── index.js              # POST /api/upload - Cloudinary image upload
├── products/
│   ├── index.js              # GET /api/products - Fetch all products
│   ├── new.js                # POST /api/products/new - Create product
│   └── [id].js               # PUT/DELETE /api/products/:id - Update/Delete
└── projects/
    ├── index.js              # GET /api/projects - Fetch all projects
    ├── new.js                # POST /api/projects/new - Create project
    └── [id].js               # PUT/DELETE /api/projects/:id - Update/Delete
```

---

## 🗄️ Database Schema

### Products Collection
```javascript
{
  id: "prod-1234567890",        // Unique identifier
  name: "Product Name",
  brand: "Brand Name",
  category: "Category",
  description: "Description",
  featured: true,               // Boolean
  image: "cloudinary_url",      // Full Cloudinary URL
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection
```javascript
{
  id: "proj-1234567890",        // Unique identifier
  name: "Project Name",
  client: "Client Name",
  category: "Category",
  scope: "Project scope",
  featured: true,               // Boolean
  image: "cloudinary_url",      // Full Cloudinary URL
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🚀 Deployment Steps

### 1. Setup MongoDB Atlas (Free Tier)

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a free account and cluster
3. Click "Connect" → "Connect your application"
4. Copy your connection string (looks like: `mongodb+srv://...`)
5. Replace `<password>` with your database password

### 2. Setup Cloudinary (Free Tier)

1. Go to [Cloudinary](https://cloudinary.com/)
2. Create a free account
3. Navigate to Dashboard
4. Copy:
   - Cloud Name
   - API Key
   - API Secret

### 3. Configure Vercel Environment Variables

In your Vercel project settings, add these environment variables:

| Variable | Value | Example |
|----------|-------|---------|
| `MONGODB_URI` | Your MongoDB connection string | `mongodb+srv://user:pass@cluster.net/panaudio` |
| `ADMIN_USER` | Admin username | `admin` |
| `ADMIN_PASS` | Admin password | `PanAudio@2024` |
| `CLOUDINARY_CLOUD_NAME` | Your cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Your API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Your API secret | `abcdefghijklmnop` |

**Using Vercel CLI:**
```bash
vercel env add MONGODB_URI
vercel env add ADMIN_USER
vercel env add ADMIN_PASS
vercel env add CLOUDINARY_CLOUD_NAME
vercel env add CLOUDINARY_API_KEY
vercel env add CLOUDINARY_API_SECRET
```

**Using Vercel Dashboard:**
1. Go to your project → Settings → Environment Variables
2. Add each variable with its value
3. Select all environments (Production, Preview, Development)

### 4. Deploy to Vercel

```bash
# Install Vercel CLI if not already installed
npm i -g vercel

# Deploy
vercel

# Or deploy to production
vercel --prod
```

---

## 🔧 Local Development

### 1. Create `.env.local` file

```bash
cp .env.example .env.local
```

Then edit `.env.local` with your actual credentials.

### 2. Install Dependencies

```bash
npm install
```

### 3. Run Development Server

```bash
# Frontend only
npm run dev

# Or with local serverless functions (using Vercel CLI)
vercel dev
```

---

## 📡 API Endpoints

### Authentication

#### Login
```http
POST /api/login
Content-Type: application/json

{
  "username": "admin",
  "password": "PanAudio@2024"
}

Response: { "success": true, "token": "..." }
```

---

### Products

#### Get All Products
```http
GET /api/products

Response: [{ id, name, brand, category, ... }]
```

#### Create Product
```http
POST /api/products/new
Content-Type: application/json

{
  "name": "Product Name",
  "brand": "Brand",
  "category": "Category",
  "description": "Description",
  "featured": true,
  "image": "https://cloudinary.com/..."
}

Response: { id: "prod-...", ... }
```

#### Update Product
```http
PUT /api/products/:id
Content-Type: application/json

{
  "name": "Updated Name",
  "brand": "Updated Brand",
  ...
}

Response: { id, ... }
```

#### Delete Product
```http
DELETE /api/products/:id

Response: { "message": "Product deleted" }
```

---

### Projects

Same API pattern as Products, but using `/api/projects` endpoints.

#### Get All Projects
```http
GET /api/projects
```

#### Create Project
```http
POST /api/projects/new
```

#### Update Project
```http
PUT /api/projects/:id
```

#### Delete Project
```http
DELETE /api/projects/:id
```

---

### Image Upload

#### Upload to Cloudinary
```http
POST /api/upload
Content-Type: application/json

{
  "imageData": "data:image/jpeg;base64,...",
  "folder": "panaudio"
}

Response: {
  "url": "https://res.cloudinary.com/...",
  "publicId": "panaudio/..."
}
```

---

## 🔐 Security Features

### Current Implementation
- ✅ MongoDB connection with credentials
- ✅ Environment variable-based configuration
- ✅ Basic admin authentication
- ✅ HTTPS by default on Vercel
- ✅ Method-specific route handlers
- ✅ Error handling and validation

### Recommended Enhancements
- 🔄 Implement JWT tokens instead of static token
- 🔄 Add rate limiting for login endpoint
- 🔄 Hash passwords with bcrypt
- 🔄 Add request validation middleware
- 🔄 Implement CORS configuration
- 🔄 Add API key authentication for sensitive routes

---

## 🎯 Differences from Express Setup

| Feature | Express Server | Vercel Serverless |
|---------|----------------|-------------------|
| **Hosting** | Self-hosted | Managed by Vercel |
| **Scaling** | Manual | Auto-scaling |
| **Storage** | Local JSON files | MongoDB Atlas |
| **Images** | Local uploads folder | Cloudinary CDN |
| **Cost** | VPS costs | Free tier available |
| **Cold Starts** | Always warm | May have cold starts |
| **State** | Persistent | Stateless functions |

---

## 🧪 Testing

### Test with curl

```bash
# Test login
curl -X POST https://your-app.vercel.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"PanAudio@2024"}'

# Get products
curl https://your-app.vercel.app/api/products

# Create product
curl -X POST https://your-app.vercel.app/api/products/new \
  -H "Content-Type: application/json" \
  -d '{"name":"Test Product","category":"Test","featured":false}'
```

---

## 🐛 Troubleshooting

### MongoDB Connection Issues

**Error:** "Please add your MongoDB URI to .env.local"
- **Solution:** Ensure `MONGODB_URI` is set in Vercel environment variables

**Error:** "MongoServerError: Authentication failed"
- **Solution:** Check your MongoDB username and password are correct

### CORS Errors

**Error:** "CORS policy: No 'Access-Control-Allow-Origin'"
- **Solution:** Vercel handles CORS automatically for API routes. If issues persist, add CORS headers in your functions.

### Image Upload Issues

**Error:** "Cloudinary not configured"
- **Solution:** Ensure all three Cloudinary environment variables are set

### API Route Not Found (404)

- Check the file structure matches the URL pattern
- Ensure files are named correctly (e.g., `[id].js` for dynamic routes)
- Redeploy if you just added new routes

---

## 📊 Monitoring

### Vercel Dashboard

1. Go to your project dashboard
2. Click "Analytics" to see:
   - Function invocations
   - Response times
   - Error rates
   - Bandwidth usage

### MongoDB Atlas

1. Go to your cluster dashboard
2. Monitor:
   - Database connections
   - Query performance
   - Storage usage

---

## 💰 Cost Estimation

### Free Tier Limits

**Vercel:**
- 100 GB bandwidth/month
- 100 GB-hours function execution
- Unlimited API calls

**MongoDB Atlas:**
- 512 MB storage
- Shared cluster (M0)
- Limited to 100 connections

**Cloudinary:**
- 25 GB storage
- 25 GB bandwidth/month
- 1,000 transformations/month

---

## 🔄 Migration from Local to Production

If you have existing data in `server/data/products.json` or `server/data/projects.json`:

### Migration Script

Create `migrate.js`:

```javascript
import { MongoClient } from 'mongodb';
import fs from 'fs';

const uri = 'your_mongodb_uri';
const client = new MongoClient(uri);

async function migrate() {
  try {
    await client.connect();
    const db = client.db('panaudio');
    
    // Migrate products
    const products = JSON.parse(fs.readFileSync('./server/data/products.json', 'utf8'));
    if (products.length > 0) {
      await db.collection('products').insertMany(products);
      console.log(`✅ Migrated ${products.length} products`);
    }
    
    // Migrate projects
    const projects = JSON.parse(fs.readFileSync('./server/data/projects.json', 'utf8'));
    if (projects.length > 0) {
      await db.collection('projects').insertMany(projects);
      console.log(`✅ Migrated ${projects.length} projects`);
    }
  } finally {
    await client.close();
  }
}

migrate();
```

Run: `node migrate.js`

---

## 📝 Frontend Configuration

Update `src/config.js` for production:

```javascript
export const API_URL = import.meta.env.PROD 
  ? '' // Empty string uses same domain in production
  : import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Or simply:
```javascript
export const API_URL = '';
```

This makes API calls relative (e.g., `/api/products`) which works on Vercel.

---

## ✅ Checklist

Before deploying to production:

- [ ] MongoDB Atlas cluster created
- [ ] Cloudinary account setup
- [ ] All environment variables added to Vercel
- [ ] Database migrated (if applicable)
- [ ] API endpoints tested locally
- [ ] Frontend updated to use correct API_URL
- [ ] Build succeeds: `npm run build`
- [ ] Deployed to Vercel
- [ ] Tested all features in production

---

## 🎉 Success!

Your Pan Audio website is now running on a modern, scalable serverless architecture!

**Live URLs:**
- Frontend: `https://your-app.vercel.app`
- API: `https://your-app.vercel.app/api/*`

**Benefits:**
- ✅ Auto-scaling
- ✅ Global CDN
- ✅ Zero server maintenance
- ✅ Cloud database
- ✅ Professional image hosting
- ✅ Free SSL certificates
- ✅ Instant deployments

Need help? Check the Vercel docs: https://vercel.com/docs
