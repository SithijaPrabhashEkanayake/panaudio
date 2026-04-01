# MongoDB Migration Setup Guide

This guide will help you migrate from JSON file storage to MongoDB + Cloudinary for hosting on free tier services.

## Prerequisites

✅ Already completed:
- Node.js dependencies installed (mongoose, cloudinary, dotenv)
- MongoDB schemas created (Product.js, Project.js)
- Backend updated to use MongoDB
- Migration script ready

❌ You need to complete:
- Create MongoDB Atlas account (free)
- Create Cloudinary account (free)
- Set up environment variables

---

## Step 1: Create MongoDB Atlas Account

### 1.1 Sign Up
1. Go to https://www.mongodb.com/cloud/atlas
2. Click "Try Free" or "Sign Up"
3. Create account with email/Google/GitHub

### 1.2 Create Free Cluster
1. Select "M0 Sandbox" (free forever, 512MB)
2. Choose cloud provider: AWS (recommended)
3. Choose region: Closest to your clients
4. Cluster name: `pan-audio` (or your choice)
5. Click "Create Cluster"

### 1.3 Get Connection String
1. Once cluster is created, click "Connect"
2. Choose "Drivers" (not Compass)
3. Select "Node.js" driver
4. Copy the connection string:
   ```
   mongodb+srv://username:password@cluster-name.mongodb.net/pan-audio?retryWrites=true&w=majority
   ```

### 1.4 Create Database User
1. In the "Security" tab, click "Database Access"
2. Click "Add New Database User"
3. Username: `panaudio` (or your choice)
4. Password: Generate secure password (25+ characters recommended)
5. Built-in roles: `Atlas Admin`
6. Click "Add User"

### 1.5 Whitelist IP
1. In the "Security" tab, click "Network Access"
2. Click "Add IP Address"
3. Choose "Allow from anywhere" (0.0.0.0/0) for development
4. For production: Add specific IP addresses
5. Click "Confirm"

---

## Step 2: Create Cloudinary Account

### 2.1 Sign Up
1. Go to https://cloudinary.com
2. Click "Sign Up Free"
3. Create account with email
4. Verify email

### 2.2 Get API Credentials
1. Go to Dashboard (main page after login)
2. Copy these values:
   - **Cloud Name**: Top of dashboard
   - **API Key**: Below Cloud Name
   - **API Secret**: Click "Show" to reveal

---

## Step 3: Configure Environment Variables

### 3.1 Create `.env` File
Copy `.env.example` to `.env`:
```bash
cp .env.example .env
```

### 3.2 Fill in MongoDB Details
Update these lines in `.env`:
```
MONGODB_URI=mongodb+srv://panaudio:YOUR_PASSWORD@cluster-name.mongodb.net/pan-audio?retryWrites=true&w=majority
```
Replace:
- `panaudio` with your database username
- `YOUR_PASSWORD` with your secure password
- `cluster-name` with your actual cluster name (from connection string)

### 3.3 Fill in Cloudinary Details
Update these lines in `.env`:
```
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### 3.4 Update Admin Credentials (Optional)
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword@2024
```

### 3.5 Verify `.env` file (IMPORTANT!)
- **NEVER commit `.env` to Git**
- Verify `.gitignore` includes `.env`

---

## Step 4: Test Locally

### 4.1 Start the Backend
```bash
npm run server
```

You should see:
```
🚀 Pan Audio Backend Server
📡 Server running on http://localhost:5000
🌍 Environment: development
🗄️  Database: MongoDB Atlas
☁️  Storage: Cloudinary
✓ Ready for requests
```

If you see connection errors:
- ✓ Verify `MONGODB_URI` is correct
- ✓ Check database user exists and password is correct
- ✓ Verify IP is whitelisted in MongoDB Atlas

### 4.2 Test API Health Check
```bash
curl http://localhost:5000/api/health
```

Expected response:
```json
{"status":"ok","message":"Pan Audio API is running"}
```

### 4.3 Get Existing Products (should be empty)
```bash
curl http://localhost:5000/api/products
```

Expected response:
```json
[]
```

---

## Step 5: Migrate Existing Data

### 5.1 Run Migration Script
```bash
node migrate-to-mongodb.js
```

You'll see output like:
```
🔗 Connecting to MongoDB...
✓ Connected to MongoDB

📦 Migrating products...
  ✓ Created: Product Name 1
  ✓ Created: Product Name 2
  ...

✓ Migrated 50 products

📁 Migrating projects...
  ✓ Created: Project Name 1
  ✓ Created: Project Name 2
  ...

✓ Migrated 26 projects

==================================================
🎉 Migration complete!
   Products in DB: 50
   Projects in DB: 26
==================================================
```

### 5.2 Verify Data in MongoDB
1. Go to MongoDB Atlas
2. Cluster → Collections
3. Should see `pan-audio` database with `products` and `projects` collections
4. Click to view documents

### 5.3 Test GET Endpoints
```bash
curl http://localhost:5000/api/products | jq '.'
curl http://localhost:5000/api/projects | jq '.'
```

Should return your migrated data!

---

## Step 6: Test Image Upload

### 6.1 Create Test Product with Image
```bash
curl -X POST http://localhost:5000/api/products \
  -F "name=Test Product" \
  -F "brand=TestBrand" \
  -F "category=Testing" \
  -F "description=Test description" \
  -F "featured=false" \
  -F "image=@/path/to/image.jpg"
```

### 6.2 Verify Image in Cloudinary
1. Go to Cloudinary Dashboard
2. Media Library
3. Should see your image in `pan-audio` folder

### 6.3 Verify Cloudinary URL Works
- Copy image URL from response
- Open in browser - should display image

---

## Step 7: Cleanup (Optional)

After confirming everything works:

### 7.1 Keep JSON Files as Backup
```bash
# Don't delete yet! Keep for at least a week
# server/data/products.json
# server/data/projects.json
```

### 7.2 Optional: Remove Local Uploads
```bash
# After confirming all images are in Cloudinary
rm -rf server/uploads
```

---

## Troubleshooting

### Connection Refused
- ✓ Check MongoDB cluster is running
- ✓ Verify MONGODB_URI is correct
- ✓ Check IP whitelist in MongoDB Atlas

### Cloudinary Upload Fails
- ✓ Verify CLOUDINARY_* variables are correct
- ✓ Check file is readable
- ✓ Check file size (free tier: max 100MB)

### API Returns 500 Error
- ✓ Check server logs for error message
- ✓ Verify .env file is loaded (restart server after .env changes)
- ✓ Check MongoDB is running

### Images Not Showing
- ✓ Verify image exists in Cloudinary
- ✓ Check Cloudinary URL is correct format
- ✓ Try opening URL directly in browser

---

## Next Steps: Deploy to Production

### Option A: Render (Recommended for Node.js)
See `RENDER_SETUP.md` (create this document)

### Option B: Railway
- Similar to Render
- Free tier: $5/month credit
- https://railway.app

### Option C: Fly.io
- Good performance
- Free tier available
- https://fly.io

---

## Important Notes

### Security Checklist
- ☐ `.env` is in `.gitignore`
- ☐ Never commit `.env` to Git
- ☐ Use strong passwords (25+ characters)
- ☐ Change default admin credentials
- ☐ Set `NODE_ENV=production` when deploying

### Production Recommendations
- ☐ Use separate MongoDB user for production (readonly + write)
- ☐ Enable MongoDB IP whitelist (specific IPs only)
- ☐ Use environment variables for secrets
- ☐ Enable Cloudinary security settings
- ☐ Set up monitoring/alerting
- ☐ Regular backups

---

## File Structure After Migration

```
pan5/
├── server/
│   ├── db.js                    # MongoDB connection
│   ├── models/
│   │   ├── Product.js           # Product schema
│   │   └── Project.js           # Project schema
│   ├── server.js                # Main app (updated)
│   ├── data/                    # Keep for backup
│   │   ├── products.json        # (backup only)
│   │   └── projects.json        # (backup only)
│   └── uploads/                 # No longer used
├── .env                         # Environment variables (gitignored)
├── .env.example                 # Template
├── migrate-to-mongodb.js        # Migration script
└── package.json                 # Updated dependencies
```

---

**Last Updated**: April 2026  
**Status**: ✓ Ready for Render/Railway deployment
