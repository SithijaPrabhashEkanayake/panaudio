# Deploy to Render (Free Backend Hosting)

After completing MongoDB migration, deploy your backend to Render.

## Overview

**Render** is perfect for your setup:
- ✅ Free tier: 750 free hours/month (enough for 1 always-on service)
- ✅ Node.js support
- ✅ Auto-deploy from GitHub
- ✅ Automatic HTTPS
- ✅ Free tier: "Web Service" (always on)

**Cost**: $0/month (within free tier limits)

---

## Step 1: Prepare Your Repository

### 1.1 Update package.json
Verify your `start` script is correct:

```json
{
  "scripts": {
    "start": "node server/server.js",
    "dev": "vite",
    "server": "nodemon server/server.js",
    "dev:all": "concurrently \"npm run dev\" \"npm run server\"",
    "build": "vite build"
  }
}
```

### 1.2 Commit Your Code
```bash
git add .
git commit -m "feat: Migrate to MongoDB and Cloudinary for production"
git push origin main
```

### 1.3 Verify .gitignore
Ensure these are ignored:
```
.env
node_modules/
server/uploads/
dist/
.env.production
```

---

## Step 2: Create Render Account

### 2.1 Sign Up
1. Go to https://render.com
2. Click "Get Started"
3. Sign up with GitHub (recommended)

### 2.2 Grant Permissions
- Allow access to your repositories
- Authorize GitHub integration

---

## Step 3: Deploy Backend

### 3.1 Create New Web Service
1. Dashboard → "New +"
2. Select "Web Service"
3. Connect your GitHub repository
4. Select your Pan Audio repository
5. Branch: `main` (or your primary branch)

### 3.2 Configure Web Service

| Setting | Value |
|---------|-------|
| **Name** | `pan-audio-api` |
| **Environment** | `Node` |
| **Build Command** | `npm install` |
| **Start Command** | `npm start` |
| **Instance Type** | `Free` |

### 3.3 Add Environment Variables
Click "Add Environment Variable" for each:

```
MONGODB_URI=mongodb+srv://panaudio:PASSWORD@cluster.mongodb.net/pan-audio?retryWrites=true&w=majority
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword@2024
FRONTEND_URL=https://your-frontend.vercel.app
NODE_ENV=production
```

⚠️ **Important**: Use STRONG passwords and secrets!

### 3.4 Deploy
Click "Create Web Service"

Render will:
- Clone your repository
- Install dependencies
- Build your project
- Start your server

---

## Step 4: Monitor Deployment

### 4.1 Check Deployment Logs
1. Dashboard → Your Service
2. "Logs" tab
3. Watch for:
   ```
   🚀 Pan Audio Backend Server
   📡 Server running on http://localhost:5000
   🗄️  Database: MongoDB Atlas
   ☁️  Storage: Cloudinary
   ✓ Ready for requests
   ```

### 4.2 Get Your API URL
1. Dashboard → Your Service
2. Copy the URL (looks like: `https://pan-audio-api.onrender.com`)
3. This is your **Backend URL** for frontend config

### 4.3 Test Health Check
```bash
curl https://pan-audio-api.onrender.com/api/health
```

Expected:
```json
{"status":"ok","message":"Pan Audio API is running"}
```

---

## Step 5: Deploy Frontend to Vercel

### 5.1 Update Frontend Config
Edit `src/config.js`:

```javascript
export const API_BASE_URL = process.env.VITE_API_URL || 
  'https://pan-audio-api.onrender.com';
```

### 5.2 Update .env.example
```
VITE_API_URL=https://pan-audio-api.onrender.com
```

### 5.3 Push to Git
```bash
git add .
git commit -m "chore: Update API URL for production"
git push origin main
```

### 5.4 Deploy to Vercel
1. Go to https://vercel.com
2. Sign in with GitHub
3. Import Project
4. Select your Pan Audio repo
5. Framework: React/Vite (auto-detected)
6. Add Environment Variable:
   ```
   VITE_API_URL=https://pan-audio-api.onrender.com
   ```
7. Deploy

---

## Step 6: Connect Your Domain

### 6.1 Point Domain to Vercel (Frontend)
1. Go to Vercel → Project Settings → Domains
2. Add your domain
3. Follow DNS instructions from Vercel
4. Wait for DNS propagation (5-30 minutes)

### 6.2 Update CORS (Backend)
Edit environment on Render:
```
FRONTEND_URL=https://yourdomain.com
```

---

## Monitoring & Maintenance

### Weekly
- ✓ Check Render logs for errors
- ✓ Monitor MongoDB Atlas storage (should be <512MB)
- ✓ Monitor Cloudinary usage (<25GB)

### Monthly
- ✓ Review Render stats (within free tier?)
- ✓ Check npm for security updates: `npm audit`
- ✓ Verify admin credentials are strong

### As Needed
- Update dependencies: `npm update`
- Deploy: Push to main branch → Render auto-deploys
- Rollback: Render keeps deployment history

---

## Scaling (When You Need It)

If you outgrow free tier:

### Render Paid Tier
- $7/month for "Starter" instance (always-on)
- Unlimited deployments
- Better performance

### MongoDB Expansion
- $50/month for M2 cluster (10GB)
- Upgrade from free sandbox

### Cloudinary Expansion
- $99/month for "Advanced" plan (500GB)
- Current usage likely under $5/month

**Total: ~$60/month** for production setup with growth

---

## Troubleshooting

### 502 Bad Gateway Error
- ✓ Check Render logs for errors
- ✓ Verify MONGODB_URI is correct
- ✓ Check MongoDB Atlas IP whitelist (allow 0.0.0.0/0 for free tier)
- ✓ Wait 5 minutes for cold start (free tier)

### Images Not Loading
- ✓ Verify Cloudinary credentials
- ✓ Check image URL format
- ✓ Ensure Cloudinary API is active

### Build Fails
- ✓ Check build logs
- ✓ Verify npm install works locally
- ✓ Ensure all dependencies are in package.json

### Environment Variables Not Loading
- ✓ Restart deployment after updating env vars
- ✓ Check names match exactly (case-sensitive)
- ✓ Verify no quotes around values

---

## API URLs After Deployment

| Endpoint | URL |
|----------|-----|
| **Frontend** | `https://yourdomain.com` |
| **Backend Health** | `https://pan-audio-api.onrender.com/api/health` |
| **Get Products** | `https://pan-audio-api.onrender.com/api/products` |
| **Get Projects** | `https://pan-audio-api.onrender.com/api/projects` |
| **Admin Login** | `https://pan-audio-api.onrender.com/api/login` |

---

## Next Steps

1. ✓ Deploy backend to Render
2. ✓ Deploy frontend to Vercel
3. ✓ Point domain to Vercel
4. ✓ Test all endpoints
5. ✓ Monitor for 1 week
6. ✓ Remove JSON backup files (if stable)
7. ✓ Set up monitoring/alerts (optional)

---

**Congratulations! 🎉**

Your website is now:
- ☑️ Hosted on free tier ($0/month)
- ☑️ Using MongoDB for data
- ☑️ Using Cloudinary for images
- ☑️ Auto-scaling with Vercel + Render
- ☑️ Production-ready

Total Cost: **$0/month** (within free tier limits)

---

**Last Updated**: April 2026  
**Status**: ✓ Ready for production
