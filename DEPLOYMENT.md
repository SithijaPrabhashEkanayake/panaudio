# Deploying Pan Audio Website to Vercel

## The Challenge

Vercel is optimized for **frontend deployments** and **serverless functions**. The current backend uses Express.js with:
- File-based storage (JSON files)
- Disk uploads (Multer)
- Persistent server state

These don't work in Vercel's serverless environment because:
1. Serverless functions are **stateless** - files are deleted after execution
2. No persistent filesystem - can't save uploaded files
3. No long-running processes

---

## Solution Options

### Option A: Vercel Serverless Functions (Recommended)
Convert Express routes to Vercel Serverless Functions + use a database

### Option B: Separate Hosting
Host frontend on Vercel, backend on a VPS/Railway/Render

### Option C: Vercel + External Database
Keep frontend on Vercel, migrate to cloud database (MongoDB Atlas)

---

## Option A: Full Vercel Deployment (Serverless)

### Step 1: Restructure Project

```
pan-audio/
├── api/                    # NEW: Vercel Serverless Functions
│   ├── products/
│   │   ├── index.js       # GET /api/products
│   │   ├── [id].js        # PUT/DELETE /api/products/:id
│   │   └── new.js         # POST /api/products
│   ├── projects/
│   │   ├── index.js
│   │   ├── [id].js
│   │   └── new.js
│   └── login.js
├── src/                   # React frontend
├── public/
├── server/                # Keep for local development
└── vercel.json
```

### Step 2: Install Dependencies

```bash
npm install mongodb
```

### Step 3: Create Vercel Config

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "routes": [
    { "src": "/api/(.*)", "dest": "/api/$1" },
    { "src": "/(.*)", "dest": "/index.html" }
  ]
}
```

### Step 4: Create Serverless Functions

#### `api/products/index.js` - Get All Products
```javascript
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await client.connect();
    const db = client.db('panaudio');
    const products = await db.collection('products').find({}).toArray();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  } finally {
    await client.close();
  }
}
```

#### `api/products/new.js` - Create Product
```javascript
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = new MongoClient(process.env.MONGODB_URI);
    await client.connect();
    
    const db = client.db('panaudio');
    const newProduct = {
      id: `prod-${Date.now()}`,
      ...req.body,
      createdAt: new Date()
    };
    
    await db.collection('products').insertOne(newProduct);
    res.status(201).json(newProduct);
    await client.close();
  } catch (error) {
    res.status(500).json({ message: 'Error creating product' });
  }
}
```

#### `api/products/[id].js` - Update/Delete Product
```javascript
import { MongoClient } from 'mongodb';

export default async function handler(req, res) {
  const { id } = req.query;
  const client = new MongoClient(process.env.MONGODB_URI);

  try {
    await client.connect();
    const db = client.db('panaudio');

    if (req.method === 'PUT') {
      const updated = await db.collection('products').findOneAndUpdate(
        { id },
        { $set: req.body },
        { returnOriginal: false }
      );
      res.json(updated);
    } 
    else if (req.method === 'DELETE') {
      await db.collection('products').deleteOne({ id });
      res.json({ message: 'Product deleted' });
    }
    else {
      res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Database error' });
  } finally {
    await client.close();
  }
}
```

### Step 5: Update Frontend Config

#### `src/config.js`
```javascript
const isProduction = process.env.NODE_ENV === 'production';

export const API_URL = isProduction 
  ? ''  // Uses same domain on Vercel
  : 'http://localhost:5000';
```

### Step 6: Update .env for Vercel

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/panaudio?retryWrites=true&w=majority
```

### Step 7: Update vercel.json (Final)

```json
{
  "version": 2,
  "builds": [
    {
      "src": "package.json",
      "use": "@vercel/static-build",
      "config": { "distDir": "dist" }
    }
  ],
  "env": {
    "MONGODB_URI": "@mongodb-uri"
  }
}
```

### Step 8: Deploy

```bash
npm i -g vercel
vercel login
vercel --prod
```

---

## Option B: Separate Hosting (Simpler)

Host backend on **Railway.app** or **Render.com** (free tier available), frontend on Vercel.

### Backend Deployment (Railway)

1. **Create Railway Account**: https://railway.app
2. **New Project** → Deploy from GitHub
3. **Add Environment Variables**:
   ```
   PORT=5000
   ```
4. **Railway will auto-detect** Express.js and deploy

### Frontend Deployment (Vercel)

1. **Update `src/config.js`**:
```javascript
export const API_URL = 'https://your-railway-app.railway.app';
```

2. **Push to GitHub**

3. **Import to Vercel**:
   - Go to https://vercel.com
   - "Add New Project"
   - Import your GitHub repo
   - Framework: Vite
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Deploy!**

---

## Option C: Vercel + Image Upload Service (Recommended for Images)

Keep everything serverless by using **Cloudinary** or **UploadThing** for images.

### Setup Cloudinary

1. Create account at https://cloudinary.com
2. Get your Cloud Name, API Key, API Secret

### Update `api/products/new.js`

```javascript
import { v2 as cloudinary } from 'cloudinary';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export default async function handler(req, res) {
  // ... image upload logic
  const result = await cloudinary.uploader.upload(req.body.image, {
    folder: 'panaudio/products'
  });
  
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...req.body,
    image: result.secure_url  // Cloudinary URL
  };
  
  // Save to MongoDB...
}
```

---

## Comparison Matrix

| Feature | Option A (Vercel) | Option B (Railway+Vercel) | Option C (Cloudinary) |
|---------|-------------------|---------------------------|----------------------|
| Complexity | High | Medium | High |
| Cost | Free tier OK | Free tier OK | Free tier OK |
| File Storage | No | Yes (Railway disk) | Yes (Cloudinary) |
| Database | Required (MongoDB) | Optional (JSON files) | Required (MongoDB) |
| Scaling | Excellent | Good | Excellent |
| Cold Starts | Yes | No | Yes |

---

## Quick Start Guide (Option B - Easiest)

### 1. Deploy Backend to Railway

```bash
# Push server folder to a new GitHub repo
mkdir backend
cp -r server/* backend/
cd backend
git init
git add .
git commit -m "Backend API"
git push origin main
```

In Railway:
- New Project → Deploy from GitHub
- Select the backend repo
- Railway auto-detects Node.js

### 2. Get Railway URL

After deployment, you'll get something like:
`https://panaudio-backend.up.railway.app`

### 3. Update Frontend Config

```javascript
export const API_URL = 'https://panaudio-backend.up.railway.app';
```

### 4. Deploy Frontend to Vercel

```bash
# Push frontend to GitHub
git add .
git commit -m "Frontend ready for Vercel"
git push origin main
```

In Vercel:
- Import project from GitHub
- Deploy!

---

## Troubleshooting

### CORS Issues
If you get CORS errors when frontend calls backend:
- In Railway: Add CORS headers in Railway dashboard → Settings → Networking
- Or update server to allow your Vercel domain

### Environment Variables
- Vercel: Project Settings → Environment Variables
- Railway: Variables tab

### Build Failures
Check that `package.json` scripts match:
```json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "start": "node server/server.js"
  }
}
```

---

## Recommended Approach

For a production website like Pan Audio:

1. **Use Option B** (Railway + Vercel) for simplicity
2. **Upgrade to Option A** when ready for full serverless
3. **Add Cloudinary** for image handling in either option

This gives you:
- Free hosting (within limits)
- Persistent file storage
- Easy scaling
- Separate frontend/backend maintenance
