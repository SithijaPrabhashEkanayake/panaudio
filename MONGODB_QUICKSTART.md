# ⚡ Quick Start: MongoDB Migration

## What's Done ✓
- Installed MongoDB (mongoose), Cloudinary, and dotenv packages
- Created MongoDB schemas (Product, Project models)
- Updated server.js to use MongoDB + Cloudinary
- Created database connection module
- Updated environment variables template
- Created migration script
- Full documentation included

## What You Need to Do (15 minutes)

### Step 1: Create Free Accounts (10 min)
1. **MongoDB Atlas** (https://mongodb.com/cloud/atlas)
   - Sign up → Create M0 free cluster → Get connection string
   
2. **Cloudinary** (https://cloudinary.com)
   - Sign up free → Copy API credentials

### Step 2: Configure Environment (2 min)
```bash
# Copy template
cp .env.example .env

# Edit .env with your credentials:
# - MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/pan-audio...
# - CLOUDINARY_CLOUD_NAME=your_cloud_name
# - CLOUDINARY_API_KEY=your_api_key
# - CLOUDINARY_API_SECRET=your_api_secret
```

### Step 3: Test Locally (3 min)
```bash
# Start backend
npm run server

# In another terminal, run migration
node migrate-to-mongodb.js

# Verify it works
curl http://localhost:5000/api/health
curl http://localhost:5000/api/products
```

## File Changes Summary

| File | Changes |
|------|---------|
| `server/server.js` | Complete rewrite: MongoDB + Cloudinary instead of file-based |
| `server/db.js` | NEW: MongoDB connection handler |
| `server/models/Product.js` | NEW: Mongoose Product schema |
| `server/models/Project.js` | NEW: Mongoose Project schema |
| `.env.example` | NEW: All environment variables documented |
| `migrate-to-mongodb.js` | NEW: Migrate existing JSON data to MongoDB |
| `MONGODB_MIGRATION.md` | NEW: Complete setup guide |

## Important: Before You Delete JSON Files

✅ Keep backups of:
- `server/data/products.json`
- `server/data/projects.json`

✅ Verify in MongoDB Atlas that all data migrated successfully

✅ Test image uploads to Cloudinary

✅ Only delete after 2 weeks of production operation

## API Endpoints (Unchanged)

All endpoints work the same as before:
- `GET /api/products` - Get all products
- `POST /api/products` - Create product (with image upload)
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product
- Similar for `/api/projects`
- `POST /api/login` - Admin login

## Images: Local → Cloudinary

**Before:**
- Stored in `server/uploads/`
- URL: `/uploads/12345.jpg`
- Issues: Not portable, not scalable

**After:**
- Stored in Cloudinary (CDN)
- URL: `https://res.cloudinary.com/...`
- Benefits: Faster, global, automatic optimization

## Deployment Ready? ✓

Once you complete steps 1-3:
- Backend is ready for Render/Railway
- Frontend ready for Vercel
- Database ready for production

See next: **RENDER_DEPLOYMENT.md** (coming next)

---

**Questions?** Check `MONGODB_MIGRATION.md` for detailed troubleshooting
