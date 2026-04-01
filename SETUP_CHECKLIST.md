# MongoDB Migration - Action Checklist

Print this or use as reference while setting up.

---

## Phase 1: Create Cloud Accounts (10 minutes)

### MongoDB Atlas
- [ ] Go to https://www.mongodb.com/cloud/atlas
- [ ] Sign up / Log in
- [ ] Create M0 Sandbox cluster (free forever)
- [ ] Wait for cluster creation (2-3 minutes)
- [ ] Go to "Connect" → Choose "Drivers" → Node.js
- [ ] Copy connection string:
  ```
  mongodb+srv://username:password@cluster.mongodb.net/pan-audio?retryWrites=true&w=majority
  ```
- [ ] Go to "Security" → "Database Access"
- [ ] Create new user: `panaudio` + strong password
- [ ] Go to "Security" → "Network Access"
- [ ] Add IP: 0.0.0.0/0 (allow from anywhere)

### Cloudinary
- [ ] Go to https://cloudinary.com
- [ ] Sign up free
- [ ] Go to Dashboard
- [ ] Copy: **Cloud Name**, **API Key**, **API Secret**
- [ ] Note them somewhere safe

---

## Phase 2: Local Setup (5 minutes)

```bash
# Copy environment template
cp .env.example .env

# Edit .env file (use your favorite editor)
nano .env
```

### In .env, fill in:

```
# MongoDB (from Atlas connection string)
MONGODB_URI=mongodb+srv://panaudio:YOUR_PASSWORD@cluster-name.mongodb.net/pan-audio?retryWrites=true&w=majority

# Cloudinary (from dashboard)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key  
CLOUDINARY_API_SECRET=your_api_secret

# Optional: Update these
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword@2024
```

- [ ] Save `.env` file
- [ ] Verify `.env` is in `.gitignore`
  ```bash
  grep "\.env" .gitignore
  ```

---

## Phase 3: Test Locally (5 minutes)

### Terminal 1: Start Backend
```bash
npm run server
```

Wait for:
```
✓ Connected to MongoDB
✓ Ready for requests
```

- [ ] Backend started successfully

### Terminal 2: Test API
```bash
# Health check
curl http://localhost:5000/api/health

# Should return: {"status":"ok","message":"Pan Audio API is running"}
curl http://localhost:5000/api/products

# Should return: []
```

- [ ] Health check works
- [ ] Products endpoint returns empty array

---

## Phase 4: Migrate Data (3 minutes)

### Terminal 1: Keep backend running

### Terminal 2: New terminal
```bash
node migrate-to-mongodb.js
```

Wait for:
```
🎉 Migration complete!
   Products in DB: 50
   Projects in DB: 26
```

- [ ] Migration script ran successfully
- [ ] Correct number of items migrated

### Verify in MongoDB Atlas
- [ ] Go to MongoDB Atlas Dashboard
- [ ] Cluster → Collections
- [ ] See `pan-audio` database
- [ ] See `products` and `projects` collections
- [ ] See documents in each collection

---

## Phase 5: Test Image Upload (5 minutes)

### Via Terminal (with cURL)
```bash
curl -X POST http://localhost:5000/api/products \
  -F "name=Test Product" \
  -F "brand=TestBrand" \
  -F "category=Testing" \
  -F "description=Test description" \
  -F "featured=false" \
  -F "image=@/path/to/your/image.jpg"
```

- [ ] Got 201 Created response
- [ ] Response includes `image` URL from Cloudinary

### Via Admin Panel
- [ ] Start frontend: `npm run dev`
- [ ] Go to http://localhost:5173/admin
- [ ] Login with admin credentials
- [ ] Create a new product with image
- [ ] Verify image uploads and displays

---

## Phase 6: Clean Up (2 minutes)

- [ ] Tested creating/reading/updating/deleting products
- [ ] Tested creating/reading/updating/deleting projects
- [ ] Verified images in Cloudinary
- [ ] All endpoints working

---

## Phase 7: Deploy to Render (Optional - 30 minutes)

### Prepare Repository
```bash
git add .
git commit -m "feat: Migrate to MongoDB and Cloudinary"
git push origin main
```

- [ ] Code pushed to GitHub

### Create Render Account
- [ ] Go to https://render.com
- [ ] Sign up with GitHub
- [ ] Authorize GitHub access

### Deploy Backend
- [ ] Click "New +" → "Web Service"
- [ ] Select your Pan Audio repository
- [ ] Name: `pan-audio-api`
- [ ] Build Command: `npm install`
- [ ] Start Command: `npm start`
- [ ] Instance Type: Free
- [ ] Add Environment Variables (same as .env):
  ```
  MONGODB_URI=...
  CLOUDINARY_CLOUD_NAME=...
  CLOUDINARY_API_KEY=...
  CLOUDINARY_API_SECRET=...
  ADMIN_USERNAME=...
  ADMIN_PASSWORD=...
  FRONTEND_URL=https://your-domain.com
  NODE_ENV=production
  ```
- [ ] Click "Create Web Service"
- [ ] Wait for deployment (2-3 minutes)
- [ ] Test health check:
  ```bash
  curl https://pan-audio-api.onrender.com/api/health
  ```
- [ ] Got success response

### Deploy Frontend to Vercel
- [ ] Go to https://vercel.com
- [ ] Import project from GitHub
- [ ] Update VITE_API_URL environment variable
- [ ] Deploy
- [ ] Verify frontend loads at vercel URL

### Connect Custom Domain
- [ ] Point domain DNS to Vercel
- [ ] Test: Go to yourdomain.com

---

## Post-Launch Checklist

### First Week
- [ ] Monitor Render logs for errors
- [ ] Check MongoDB storage usage (<512MB)
- [ ] Test admin panel works
- [ ] Test image uploads work
- [ ] Monitor for unusual activity

### After 2 Weeks (if stable)
- [ ] Backup JSON files to external drive
- [ ] Delete: `server/data/products.json`
- [ ] Delete: `server/data/projects.json`
- [ ] Delete: `server/uploads/` directory
- [ ] Continue monitoring

### Monthly
- [ ] Run `npm audit` for security
- [ ] Check Render stats
- [ ] Review MongoDB usage
- [ ] Update if needed: `npm update`

---

## Troubleshooting Quick Links

| Issue | Solution |
|-------|----------|
| "Cannot connect to MongoDB" | Check MONGODB_URI, password, IP whitelist |
| "Cloudinary upload fails" | Check API credentials, file size |
| "502 Bad Gateway" on Render | Check environment variables, restart |
| "Images not displaying" | Check Cloudinary URL, verify API active |
| "Migration script fails" | Check MongoDB connection, verify JSON exists |

See `MONGODB_MIGRATION.md` → "Troubleshooting" section for detailed help.

---

## File Locations (For Reference)

```
Your Files:
- Backend: server/server.js
- Models: server/models/Product.js, server/models/Project.js
- Config: .env (keep secret!)
- Migration: migrate-to-mongodb.js

Documentation:
- MONGODB_QUICKSTART.md ← Start here!
- MONGODB_MIGRATION.md ← Full guide
- RENDER_DEPLOYMENT.md ← Deploy guide
- MONGODB_COMPLETE.md ← Overview

Keep as Backup (for 2 weeks):
- server/data/products.json
- server/data/projects.json
- server/uploads/
```

---

## Success = ✅ All Boxes Checked

Once all items are checked:

✅ Local setup working  
✅ Data migrated to MongoDB  
✅ Images uploading to Cloudinary  
✅ All API endpoints tested  
✅ Backend deployed to Render (optional)  
✅ Frontend deployed to Vercel (optional)  
✅ Custom domain connected (optional)  

**You're live in production!** 🚀

---

**Estimated Total Time**: 30-120 minutes (depending on deployment choice)  
**Cost**: $0/month (within free tiers)  
**Support**: Check documentation files or MongoDB/Cloudinary official docs

---

**Start with:** `MONGODB_QUICKSTART.md` (5 min read)
