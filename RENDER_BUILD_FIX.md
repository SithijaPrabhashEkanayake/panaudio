# 🚀 Render Deployment - Build Error Fix

**Error**: `sh: 1: vite: not found`  
**Status**: Easy Fix (5 minutes)

---

## What Went Wrong

Render is configured to run:
1. `npm install` ✅ (works)
2. `npm run build` ❌ (fails - tries to run `vite build`)

The problem: Render is trying to **build the frontend**, but it should only **run the backend**.

---

## The Fix (Choose One)

### ✅ Option 1: Fix Render Configuration (Recommended)

This is the correct approach because:
- Backend goes to Render
- Frontend goes to Vercel
- Each service does one job

**Steps:**

1. **Go to Render Dashboard**
   - https://dashboard.render.com
   - Click on "pan-audio-api" service

2. **Go to Settings tab**

3. **Find "Build Command"**
   - Current: `npm install; npm run build`
   - Change to: `npm install`
   
4. **Find "Start Command"**
   - Keep as: `npm start`
   - (This runs: `node server/server.js`)

5. **Click "Save"**

6. **Trigger a new deploy**
   - Click "Manual Deploy" → "Latest Commit"
   - Wait for build to complete
   - Should say "Deployed successfully"

7. **Test it**
   ```bash
   curl https://pan-audio-api.onrender.com/api/health
   ```
   Should return: `{"status":"ok","message":"Pan Audio API is running"}`

---

### ❌ Option 2: Add vite to Dependencies (Not Recommended)

Only do this if you want Render to build frontend (not ideal):

```bash
npm install --save vite @vitejs/plugin-react

# This moves vite from devDependencies to dependencies
# Then commit and push
git add package.json package-lock.json
git commit -m "chore: add vite to production dependencies"
git push origin main
```

**Why not to do this:**
- Larger deployment (~500MB vs 50MB)
- Slower deploys (has to build frontend each time)
- Not the intended architecture
- Wastes Render resources

---

## Architecture You Should Have

```
Your Domain (yourdomain.com)
         |
         ├─→ Vercel Frontend
         |   ├─ React/Vite
         |   ├─ Build: npm run build
         |   └─ Serves UI
         |
         └─→ Render Backend (Proxy)
             ├─ Node.js/Express
             ├─ Start: npm start
             └─ API endpoints

Frontend calls:
  /api/products → https://pan-audio-api.onrender.com/api/products
```

---

## Step-by-Step Fix (5 Minutes)

### Step 1: Update Render Settings (2 min)
1. Go to https://dashboard.render.com
2. Click "pan-audio-api"
3. Go to "Settings"
4. Build Command: Change to `npm install`
5. Click "Save"

### Step 2: Trigger New Deploy (2 min)
1. Scroll down to "Deploys"
2. Click "Manual Deploy"
3. Click "Latest Commit"
4. Wait for build (usually 1-2 minutes)

### Step 3: Verify (1 min)
1. Check status → should show "Live"
2. Test: Click the URL to see live service

---

## Expected Output

After fix, you should see in Render logs:

```
==> Running build command 'npm install'...

added 140 packages in 3s

==> Starting service with 'npm start'...

✓ Connected to MongoDB
🚀 Pan Audio Backend Server
📡 Server running on http://localhost:10000
🗄️  Database: MongoDB Atlas
☁️  Storage: Cloudinary
✓ Ready for requests
```

---

## Verify It Works

### Test 1: Health Check
```bash
curl https://pan-audio-api.onrender.com/api/health

# Should return:
{"status":"ok","message":"Pan Audio API is running"}
```

### Test 2: Get Products
```bash
curl https://pan-audio-api.onrender.com/api/products

# Should return array of products
```

---

## Next: Deploy Frontend to Vercel

Once backend is working on Render:

1. **Go to https://vercel.com/import**
2. **Import your repository**
3. **Settings:**
   - Framework: React
   - Build Command: `npm run build`
   - Environment Variables:
     ```
     VITE_API_URL=https://pan-audio-api.onrender.com
     ```
4. **Deploy**
5. **Update your domain DNS to point to Vercel**

---

## Common Issues & Solutions

### Issue: Still says "vite: not found"
- **Solution**: Make sure you saved the settings and triggered a new deploy
- Wait for Render to rebuild (shows in Logs)

### Issue: Backend starts but no data
- **Solution**: Check MongoDB URI in .env variables
- Verify credentials are correct
- Check MongoDB Atlas IP whitelist

### Issue: Can't connect to MongoDB
- **Solution**: 
  - Go to MongoDB Atlas
  - Security → Network Access
  - Allow 0.0.0.0/0 (or Render IP)
  - Verify MONGODB_URI is correct

### Issue: Images not uploading
- **Solution**: 
  - Check Cloudinary credentials
  - Verify API key and secret in .env
  - Check Cloudinary dashboard for errors

---

## Render Environment Variables (Verify)

Go to Render Settings → Environment Variables, make sure you have:

```
MONGODB_URI=mongodb+srv://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
ADMIN_USERNAME=admin
ADMIN_PASSWORD=...
FRONTEND_URL=https://yourdomain.com (or vercel URL)
NODE_ENV=production
```

---

## Success Criteria

✅ Render shows "Live" status  
✅ Backend URL works: https://pan-audio-api.onrender.com  
✅ Health check returns JSON  
✅ No errors in logs  
✅ MongoDB connected  
✅ Ready for frontend deploy  

---

## Timeline

- **Now**: Fix Render build command (5 min)
- **Next**: Wait for Render to rebuild (2-3 min)
- **Then**: Verify backend works (2 min)
- **Then**: Deploy frontend to Vercel (30 min)
- **Finally**: Connect domain (done!)

---

## Need Help?

1. Check Render logs for specific error messages
2. Verify .env variables are set correctly
3. Make sure MongoDB Atlas cluster is running
4. Check MongoDB IP whitelist allows Render IP

---

**TL;DR: Change Render build command from `npm install; npm run build` to just `npm install`, save, redeploy. Done!**

Take 5 minutes now to fix this, and you'll be up and running! 🚀
