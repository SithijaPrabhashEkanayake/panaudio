# 🚀 Quick Deployment Guide

## Deploy in 3 Steps

### 1️⃣ Deploy Backend to Railway (5 minutes)

1. Go to [railway.app](https://railway.app) and sign up
2. Click **"New Project"** → **"Deploy from GitHub repo"**
3. Select this repository
4. Configure:
   - **Root Directory**: `server`
   - **Start Command**: `npm start`
5. Add Environment Variables:
   ```
   PORT=5000
   NODE_ENV=production
   ADMIN_USERNAME=admin
   ADMIN_PASSWORD=YourSecurePassword123!
   ```
6. Copy your Railway URL (e.g., `https://your-app.up.railway.app`)

### 2️⃣ Deploy Frontend to Vercel (5 minutes)

1. Go to [vercel.com](https://vercel.com) and sign up
2. Click **"Add New Project"** → Import this repository
3. Configure:
   - **Framework**: Vite (auto-detected)
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Add Environment Variable:
   ```
   VITE_API_URL = https://your-app.up.railway.app
   ```
   (Use your Railway URL from Step 1)
5. Click **"Deploy"**

### 3️⃣ Update CORS (2 minutes)

1. Copy your Vercel URL (e.g., `https://your-app.vercel.app`)
2. In Railway project settings, add environment variable:
   ```
   FRONTEND_URL=https://your-app.vercel.app
   ```
3. Railway will auto-redeploy

**Done! Your site is live! 🎉**

---

## Local Development

### Run Both Servers:
```bash
npm run dev:all
```

### Environment Setup:
```bash
# Copy environment templates
cp .env.example .env.development
cp server/.env.example server/.env

# Update with your values
```

---

## Useful Commands

```bash
# Development
npm run dev          # Frontend only
npm run server       # Backend only
npm run dev:all      # Both servers

# Production
npm run build        # Build frontend
npm run preview      # Preview build locally

# Deploy
vercel --prod        # Deploy to Vercel
railway up           # Deploy to Railway
```

---

## Environment Variables

### Frontend (.env)
```bash
VITE_API_URL=http://localhost:5000  # Development
VITE_API_URL=https://your-railway-app.up.railway.app  # Production
```

### Backend (server/.env)
```bash
PORT=5000
NODE_ENV=development
ADMIN_USERNAME=admin
ADMIN_PASSWORD=PanAudio@2024
FRONTEND_URL=http://localhost:5173  # Development
FRONTEND_URL=https://your-app.vercel.app  # Production
```

---

## Troubleshooting

### CORS Error?
- Verify `FRONTEND_URL` in Railway matches your Vercel URL
- Check Railway logs for CORS warnings
- Restart Railway service

### Images Not Loading?
- Check Railway `server/uploads/` directory has images
- Verify image URLs use full Railway domain
- Check Railway serves `/uploads` statically

### Build Fails?
- Check Node version (requires 18+)
- Verify all dependencies in `package.json`
- Check build logs for specific errors

---

## 📚 Full Documentation

- **Detailed Hosting Guide**: `HOSTING_GUIDE.md`
- **Tech Stack Report**: `TECH_STACK_REPORT.md`
- **Backend Documentation**: `BACKEND.md`
- **Deployment Options**: `DEPLOYMENT.md`

---

## 💡 Quick Tips

- ✅ Railway auto-deploys on push to `main`
- ✅ Vercel creates preview URLs for pull requests
- ✅ Both platforms have free tiers
- ✅ SSL certificates are automatic
- ✅ Both have built-in monitoring dashboards

**Need help?** Check `HOSTING_GUIDE.md` for comprehensive documentation.
