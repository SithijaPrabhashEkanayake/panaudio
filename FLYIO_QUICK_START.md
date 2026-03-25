# 🚀 Quick Deploy: Fly.io + Cloudflare Pages

## Prerequisites
- [ ] Supabase account created
- [ ] ImageKit account created
- [ ] Fly.io account created (credit card required)
- [ ] Cloudflare account created
- [ ] GitHub repo ready

## Step 1: Database (Supabase)

```bash
# 1. Go to https://supabase.com
# 2. Create new project
# 3. Copy connection string from Settings → Database
# Save it as: DATABASE_URL
```

## Step 2: Images (ImageKit)

```bash
# 1. Go to https://imagekit.io
# 2. Sign up and verify email
# 3. Copy from Developer Options:
#    - URL Endpoint
#    - Public Key
#    - Private Key
```

## Step 3: Install Fly CLI

**Windows:**
```powershell
iwr https://fly.io/install.ps1 -useb | iex
```

**Mac/Linux:**
```bash
curl -L https://fly.io/install.sh | sh
```

## Step 4: Deploy Backend

```bash
cd server

# Login to Fly.io
fly auth login

# Launch app (follow prompts)
fly launch --region sin --no-deploy

# Set secrets
fly secrets set DATABASE_URL="postgresql://postgres:PASSWORD@db.xxxxx.supabase.co:5432/postgres"
fly secrets set IMAGEKIT_PUBLIC_KEY="public_xxxxx"
fly secrets set IMAGEKIT_PRIVATE_KEY="private_xxxxx"
fly secrets set IMAGEKIT_URL_ENDPOINT="https://ik.imagekit.io/your-id"
fly secrets set JWT_SECRET="your-random-32-char-secret"
fly secrets set ADMIN_USERNAME="admin"
fly secrets set ADMIN_PASSWORD="YourPassword123!"
fly secrets set FRONTEND_URL="https://panaudio.pages.dev"
fly secrets set PORT="8080"

# Deploy
fly deploy

# Get URL
fly status
# Save URL: https://panaudio-backend.fly.dev
```

## Step 5: Run Migration

```bash
# Option A: From local machine
# Edit server/.env with Supabase DATABASE_URL
npm run migrate

# Option B: From Fly.io machine
fly ssh console
node db/migrate.js
exit
```

## Step 6: Test Backend

```bash
curl https://panaudio-backend.fly.dev/health

# Should return: {"status":"ok","timestamp":"...","environment":"production"}
```

## Step 7: Deploy Frontend

```bash
# Update .env.production with your Fly.io URL
echo "VITE_API_URL=https://panaudio-backend.fly.dev" > .env.production

# Commit and push
git add .
git commit -m "Ready for Cloudflare Pages"
git push

# Go to https://dash.cloudflare.com
# Pages → Create a project → Connect to Git
# Select your repo
# Build command: npm run build
# Build output: dist
# Environment variable: VITE_API_URL = https://panaudio-backend.fly.dev
# Deploy!

# Save URL: https://panaudio.pages.dev
```

## Step 8: Update CORS

```bash
fly secrets set FRONTEND_URL="https://panaudio.pages.dev"
fly apps restart panaudio-backend
```

## Step 9: Test Everything

```bash
# Open your Cloudflare Pages URL
# Try logging in
# Upload a product with image
# Verify image loads from ImageKit
```

## ✅ Done!

**Frontend:** https://panaudio.pages.dev  
**Backend:** https://panaudio-backend.fly.dev  
**Cost:** $0/month

---

## Useful Commands

```bash
# Fly.io logs
fly logs

# Fly.io status
fly status

# Fly.io SSH
fly ssh console

# Redeploy backend
fly deploy

# Redeploy frontend
git push  # Cloudflare auto-deploys
```

---

## Free Tier Limits

- **Fly.io**: 3 VMs (256MB), 160GB bandwidth/month
- **Cloudflare Pages**: Unlimited bandwidth, 500 builds/month
- **Supabase**: 500MB database
- **ImageKit**: 20GB bandwidth/month, 20GB storage

**When to upgrade:**
- Fly.io: When you need more than 3 VMs (~$2/VM/month)
- Supabase: When you exceed 500MB ($25/month for 8GB)
- ImageKit: When you exceed 20GB bandwidth ($9/month for 60GB)

---

See `FLYIO_DEPLOYMENT.md` for detailed instructions.
