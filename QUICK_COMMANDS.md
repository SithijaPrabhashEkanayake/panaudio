# ⚡ Quick Command Reference

Copy and paste these commands in order:

## Step 1: Create .env File
```bash
cd "E:\panaudio final (2)\pan5"
cp .env.example .env
```

## Step 2: Start Backend (Terminal 1)
```bash
npm run server
```

**Expected output:**
```
✓ Connected to MongoDB
✓ Pan Audio Backend Server
📡 Server running on http://localhost:5000
🗄️  Database: MongoDB Atlas
☁️  Storage: Cloudinary
✓ Ready for requests
```

**KEEP THIS TERMINAL RUNNING** ← Don't close it!

---

## Step 3: Migrate Data (Terminal 2 - NEW TERMINAL)
```bash
cd "E:\panaudio final (2)\pan5"
node migrate-to-mongodb.js
```

**Expected output:**
```
🎉 Migration complete!
   Products in DB: 50
   Projects in DB: 26
```

---

## Step 4: Test API (Terminal 3 - NEW TERMINAL)
```bash
# Test health check
curl http://localhost:5000/api/health

# Get products from MongoDB
curl http://localhost:5000/api/products

# Get projects from MongoDB  
curl http://localhost:5000/api/projects
```

**Expected**: JSON data from your database

---

## Step 5: Test Frontend (Terminal 3)
```bash
npm run dev
```

Visit: http://localhost:5173

**Expected:**
- Admin panel loads
- Products display
- Can create/edit/delete
- Images upload to Cloudinary ✅

---

## Verify Everything Works

### ✅ Backend checks:
```bash
# 1. Server running?
curl http://localhost:5000/api/health
# Should return: {"status":"ok","message":"Pan Audio API is running"}

# 2. Data in DB?
curl http://localhost:5000/api/products
# Should return: [...]  (your products)

# 3. Can create?
curl -X POST http://localhost:5000/api/products \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","brand":"Test","category":"Test","description":"Test","featured":false}'
# Should return: 201 Created with new product
```

### ✅ Frontend checks:
- Go to http://localhost:5173
- Admin login works
- Products show
- Create product works
- Edit product works
- Delete product works

---

## If Something Goes Wrong

### Backend won't start?
```bash
# Check Node.js version
node --version

# Reinstall dependencies
npm install

# Try starting again
npm run server
```

### Migration fails?
```bash
# Verify files exist
ls server/data/products.json
ls server/data/projects.json

# Check MongoDB connection first
npm run server
# Should see: ✓ Connected to MongoDB

# Then run migration
node migrate-to-mongodb.js
```

### .env issues?
```bash
# Verify .env was created
ls .env

# Check it has values (use editor to view)
cat .env

# Restart server after editing .env
npm run server
```

---

## Terminal Setup (Recommended)

**Terminal 1:** Backend
```bash
npm run server
```
→ Keep running while developing

**Terminal 2:** Migrations & Tests
```bash
node migrate-to-mongodb.js
curl http://localhost:5000/api/health
```

**Terminal 3:** Frontend
```bash
npm run dev
```
→ Visit http://localhost:5173

---

## Next Phase: Deploy (When Ready)

```bash
# 1. Commit code to Git
git add .
git commit -m "feat: MongoDB and Cloudinary migration complete"
git push origin main

# 2. Follow RENDER_DEPLOYMENT.md
# Deploy backend to Render
# Deploy frontend to Vercel
# Connect custom domain
```

---

## Help & Documentation

- **Quick checklist**: SETUP_CHECKLIST.md
- **Detailed guide**: MONGODB_MIGRATION.md
- **Deployment**: RENDER_DEPLOYMENT.md
- **Overview**: MONGODB_COMPLETE.md

