# 🚀 Production Deployment - Quick Checklist

## Pre-Deployment (Local Setup)

- [ ] Create Neon PostgreSQL database
- [ ] Create Cloudinary account
- [ ] Copy `server/.env.example` to `server/.env`
- [ ] Add Neon `DATABASE_URL` to `server/.env`
- [ ] Add Cloudinary credentials to `server/.env`
- [ ] Generate JWT secret: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"`
- [ ] Add JWT secret to `server/.env`
- [ ] Install dependencies: `cd server && npm install`
- [ ] Run migration: `npm run migrate`
- [ ] Test locally: `npm run dev:all`

## Railway Backend Deployment

- [ ] Push code to GitHub
- [ ] Create Railway project from GitHub repo
- [ ] Set Root Directory to `server`
- [ ] Add all environment variables in Railway:
  - [ ] `DATABASE_URL`
  - [ ] `CLOUDINARY_CLOUD_NAME`
  - [ ] `CLOUDINARY_API_KEY`
  - [ ] `CLOUDINARY_API_SECRET`
  - [ ] `JWT_SECRET`
  - [ ] `PORT=5000`
  - [ ] `NODE_ENV=production`
  - [ ] `ADMIN_USERNAME`
  - [ ] `ADMIN_PASSWORD`
- [ ] Generate Railway domain
- [ ] Copy Railway URL (e.g., `https://your-app.up.railway.app`)
- [ ] Test health endpoint: `https://your-app.up.railway.app/health`
- [ ] Test API: `https://your-app.up.railway.app/api/products`

## Vercel Frontend Deployment

- [ ] Update `.env.production` with Railway URL
- [ ] Commit and push changes
- [ ] Create Vercel project from GitHub repo
- [ ] Framework: Vite (auto-detected)
- [ ] Build command: `npm run build`
- [ ] Output directory: `dist`
- [ ] Add environment variable: `VITE_API_URL=https://your-railway-app.up.railway.app`
- [ ] Deploy
- [ ] Copy Vercel URL (e.g., `https://your-app.vercel.app`)
- [ ] Test frontend loads correctly

## Connect Frontend & Backend

- [ ] Add `FRONTEND_URL` in Railway variables with Vercel URL
- [ ] Wait for Railway auto-redeploy
- [ ] Test from frontend that API calls work (no CORS errors)
- [ ] Test admin login
- [ ] Test creating/editing/deleting products
- [ ] Test image uploads (verify Cloudinary URLs)

## Security Verification

- [ ] Admin password changed from default
- [ ] JWT secret is random 32+ character string
- [ ] All `.env` files in `.gitignore`
- [ ] No credentials in code
- [ ] CORS only allows Vercel domain
- [ ] All API tokens/secrets are in env vars

## Production Testing

- [ ] Login to admin panel
- [ ] Create test product with image
- [ ] Verify image loads from Cloudinary
- [ ] Edit product
- [ ] Delete product
- [ ] Test on mobile device
- [ ] Check browser console for errors
- [ ] Test all pages load correctly

## Post-Deployment

- [ ] Backup database: `pg_dump ...`
- [ ] Set up monitoring alerts
- [ ] Document Railway and Vercel URLs
- [ ] Update README with deployment info
- [ ] Add custom domain (optional)
- [ ] Set up automated backups

---

## Environment Variables Summary

### Railway (Backend)
```
DATABASE_URL=postgresql://...
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
JWT_SECRET=...
PORT=5000
NODE_ENV=production
ADMIN_USERNAME=admin
ADMIN_PASSWORD=YourSecurePassword123!
FRONTEND_URL=https://your-app.vercel.app
```

### Vercel (Frontend)
```
VITE_API_URL=https://your-app.up.railway.app
```

---

## Quick Test Commands

```bash
# Test Railway health
curl https://your-app.up.railway.app/health

# Test products API
curl https://your-app.up.railway.app/api/products

# Test login
curl -X POST https://your-app.up.railway.app/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"YourPassword"}'

# Test authenticated endpoint (replace TOKEN)
curl -X GET https://your-app.up.railway.app/api/products \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Troubleshooting Quick Fixes

| Problem | Solution |
|---------|----------|
| CORS errors | Add/update `FRONTEND_URL` in Railway |
| Database errors | Check `DATABASE_URL` format |
| Image upload fails | Verify Cloudinary credentials |
| Invalid token | Re-login to get fresh JWT |
| Build fails | Check Railway logs for errors |

---

**Total time**: ~45 minutes  
**Cost**: $0 (free tier)  
**Difficulty**: Medium

See `PRODUCTION_DEPLOYMENT.md` for detailed instructions.
