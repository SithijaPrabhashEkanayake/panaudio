# Pan Audio Website - Backend Documentation

## Overview

The Pan Audio website uses **Vercel Serverless Functions** for its backend, providing a scalable, auto-managed API infrastructure. The frontend (React + Vite) communicates with serverless API endpoints, with data stored in MongoDB Atlas and images hosted on Cloudinary CDN.

---

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| **Deployment** | Vercel Serverless | - | Auto-scaling serverless functions |
| **Database** | MongoDB Atlas | - | Cloud-hosted NoSQL database |
| **Image Storage** | Cloudinary | - | Cloud-based image CDN |
| **Runtime** | Node.js | Latest | JavaScript runtime |
| **Legacy** | Express.js | 5.2.1 | Local development only |
| Development | nodemon | 3.1.14 | Auto-restart on file changes |
| Concurrency | concurrently | 9.2.1 | Run frontend and backend simultaneously |

---

## Architecture

### Production (Vercel Serverless)
```
┌─────────────────────────────────────────────────────────────┐
│              Frontend (React) - Vercel CDN                  │
│                https://your-app.vercel.app                   │
└─────────────────────────────────────────────────────────────┘
                              │ HTTPS/JSON
                              ▼
┌─────────────────────────────────────────────────────────────┐
│           Vercel Serverless Functions (/api/*)             │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │   /login     │  │  /products/* │  │   /projects/*    │  │
│  │   /upload    │  │  /api routes │  │   /api routes    │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                  │                              │
                  ▼                              ▼
    ┌────────────────────────┐    ┌────────────────────────┐
    │   MongoDB Atlas        │    │   Cloudinary CDN       │
    │   (Database)           │    │   (Image Hosting)      │
    └────────────────────────┘    └────────────────────────┘
```

### Local Development (Optional Express.js)
```
┌─────────────────────────────────────────────────────────────┐
│                   Frontend (React + Vite)                   │
│                   http://localhost:5173                      │
└─────────────────────────────────────────────────────────────┘
                              │ HTTP/JSON
                              ▼
┌─────────────────────────────────────────────────────────────┐
│              Backend (Express.js - Optional)                │
│                   http://localhost:5000                      │
│  For local testing only - not used in production            │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
api/                           # Vercel Serverless Functions
├── lib/
│   └── db.js                 # MongoDB connection handler
├── login.js                  # POST /api/login - Authentication
├── upload/
│   └── index.js              # POST /api/upload - Cloudinary uploads
├── products/
│   ├── index.js              # GET /api/products
│   ├── new.js                # POST /api/products/new
│   └── [id].js               # PUT/DELETE /api/products/:id
└── projects/
    ├── index.js              # GET /api/projects
    ├── new.js                # POST /api/projects/new
    └── [id].js               # PUT/DELETE /api/projects/:id

server/                        # Legacy Express server (local dev only)
├── server.js                 # For local testing if needed
├── data/                     # Old JSON storage (migrate to MongoDB)
└── uploads/                  # Old local uploads (migrate to Cloudinary)
```

---

## API Endpoints

### Products API

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/products` | Fetch all products | - |
| POST | `/api/products` | Create new product | multipart/form-data |
| PUT | `/api/products/:id` | Update product | multipart/form-data |
| DELETE | `/api/products/:id` | Delete product | - |

#### Product Data Structure (MongoDB)

```json
{
  "_id": ObjectId("..."),
  "id": "prod-1709654321000",
  "name": "Product Name",
  "brand": "Brand Name",
  "category": "Category Name",
  "description": "Product description",
  "featured": true,
  "image": "https://res.cloudinary.com/your-cloud/image/upload/v1234/panaudio/image.jpg",
  "createdAt": ISODate("2024-03-24T..."),
  "updatedAt": ISODate("2024-03-24T...")
}
```

### Projects API

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/projects` | Fetch all projects | - |
| POST | `/api/projects` | Create new project | multipart/form-data |
| PUT | `/api/projects/:id` | Update project | multipart/form-data |
| DELETE | `/api/projects/:id` | Delete project | - |

#### Project Data Structure (MongoDB)

```json
{
  "_id": ObjectId("..."),
  "id": "proj-1709654321000",
  "name": "Project Name",
  "category": "Category Name",
  "description": "Project description",
  "client": "Client Name",
  "scope": "Project scope details",
  "featured": true,
  "image": "https://res.cloudinary.com/your-cloud/image/upload/v1234/panaudio/project.jpg",
  "createdAt": ISODate("2024-03-24T..."),
  "updatedAt": ISODate("2024-03-24T...")
}
```

### Authentication API

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/login` | Admin login | `{ username, password }` |

---

## How It Works

### 1. Serverless Function Execution

Each API route is a separate serverless function that:
- Spins up on-demand when called
- Executes the handler function
- Returns the response
- Shuts down after completion

```javascript
// api/products/index.js
export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  
  const client = await clientPromise;
  const db = client.db('panaudio');
  const products = await db.collection('products').find({}).toArray();
  res.json(products);
}
```

### 2. MongoDB Connection Pooling

The database connection is reused across function invocations for better performance:

```javascript
// api/lib/db.js
import { MongoClient } from 'mongodb';

const uri = process.env.MONGODB_URI;
let clientPromise;

if (process.env.NODE_ENV === 'development') {
  // Use global variable to persist connection in development
  if (!global._mongoClientPromise) {
    const client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Create new connection in production
  const client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
```

### 3. Environment Variables

All sensitive data is stored in Vercel environment variables:
- `MONGODB_URI` - Database connection string
- `ADMIN_USER` / `ADMIN_PASS` - Authentication credentials
- `CLOUDINARY_*` - Image upload credentials

### 4. Image Upload to Cloudinary

Instead of storing images locally, they're uploaded to Cloudinary CDN:

```javascript
// api/upload/index.js
export default async function handler(req, res) {
  const { imageData, folder } = req.body;
  
  const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
    method: 'POST',
    body: JSON.stringify({ file: imageData, folder: folder || 'panaudio' })
  });
  
  const result = await response.json();
  res.json({ url: result.secure_url, publicId: result.public_id });
}
```

### 5. CRUD Operations Example

**Create Product (Serverless):**
```javascript
// api/products/new.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const client = await clientPromise;
  const db = client.db('panaudio');
  
  const newProduct = {
    id: `prod-${Date.now()}`,
    ...req.body,
    featured: req.body.featured === true || req.body.featured === 'true',
    createdAt: new Date()
  };
  
  await db.collection('products').insertOne(newProduct);
  res.status(201).json(newProduct);
}
```

**Update Product (Dynamic Route):**
```javascript
// api/products/[id].js
export default async function handler(req, res) {
  const { id } = req.query; // Vercel extracts [id] from URL
  
  if (req.method === 'PUT') {
    const client = await clientPromise;
    const db = client.db('panaudio');
    
    const updatedProduct = {
      ...req.body,
      featured: req.body.featured === true || req.body.featured === 'true',
      updatedAt: new Date()
    };
    
    const result = await db.collection('products').findOneAndUpdate(
      { id },
      { $set: updatedProduct },
      { returnOriginal: false }
    );
    
    res.json(result);
  }
}
```

**Delete Product:**
```javascript
// api/products/[id].js (same file, different method)
if (req.method === 'DELETE') {
  const client = await clientPromise;
  const db = client.db('panaudio');
  
  const result = await db.collection('products').deleteOne({ id });
  
  if (result.deletedCount === 0) {
    return res.status(404).json({ message: 'Product not found' });
  }
  
  res.json({ message: 'Product deleted' });
}
```

### 6. Admin Authentication

Simple environment-based authentication:

```javascript
// api/login.js
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;
  
  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASS || 'PanAudio@2024';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true, token: 'pan-secure-session-token-98f6d' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}
```

---

## Running the Application

### Production (Vercel)

```bash
# Deploy to Vercel
vercel

# Or deploy to production directly
vercel --prod
```

### Local Development with Vercel CLI (Recommended)

```bash
# Install Vercel CLI
npm i -g vercel

# Run serverless functions locally
vercel dev
```

This will:
- Run frontend on `http://localhost:3000`
- Simulate serverless functions locally
- Use your `.env.local` for environment variables

### Alternative: Local Development (Vite only)

```bash
# Frontend only (calls production API)
npm run dev
```

Frontend runs on `http://localhost:5173`

### Legacy: Run Express Server Locally (Optional)

```bash
# Terminal 1 - Backend (for testing Express.js server)
npm run server

# Terminal 2 - Frontend
npm run dev
```

Or run both together:
```bash
npm run dev:all
```

---

## Frontend Integration

### Production Configuration

In production, the API URL is relative to the same domain:

```javascript
// src/config.js
export const API_URL = import.meta.env.PROD 
  ? '' // Uses same domain in production (https://your-app.vercel.app)
  : import.meta.env.VITE_API_URL || 'http://localhost:5000';
```

Or simply:
```javascript
export const API_URL = '';
```

### Example API Call

```javascript
import { API_URL } from './config';

const fetchProducts = async () => {
  try {
    const res = await fetch(`${API_URL}/api/products`);
    if (res.ok) {
      const data = await res.json();
      setProducts(data);
    }
  } catch (err) {
    console.error("Failed to fetch products:", err);
  }
};
```

In production: `fetch('/api/products')` → `https://your-app.vercel.app/api/products`  
In development: `fetch('http://localhost:5000/api/products')`

---

## Security Considerations

### Current Implementation (Production)
- ✅ HTTPS by default on Vercel
- ✅ Environment variable-based configuration
- ✅ MongoDB connection with credentials
- ✅ Cloud-hosted sensitive data
- ✅ No exposed credentials in code
- ✅ Stateless serverless architecture
- ✅ Method-specific route handlers

### Recommended Improvements
1. **JWT Authentication**: Replace static token with JWT
2. **Password Hashing**: Use bcrypt for password storage
3. **Rate Limiting**: Add Vercel Edge Middleware for rate limiting
4. **Input Validation**: Implement validation middleware
5. **CORS Configuration**: Fine-tune CORS for specific domains
6. **API Keys**: Add API key authentication for sensitive routes
7. **Image Validation**: Validate image uploads on server side
8. **MongoDB Indexes**: Add indexes for better query performance

---

## Data Flow Diagram

### Production Flow (Serverless)
```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser    │         │   Vercel     │         │   MongoDB    │
│   (React)    │         │  Serverless  │         │    Atlas     │
└──────────────┘         └──────────────┘         └──────────────┘
       │                       │                        │
       │  1. POST /api/products/new (JSON + image URL)  │
       │───────────────────────────────────────────────>│
       │                       │                        │
       │                       │  2. Insert into DB     │
       │                       │───────────────────────>│
       │                       │                        │
       │                       │  3. Confirmation       │
       │                       │<───────────────────────│
       │                       │                        │
       │  4. JSON Response     │                        │
       │<───────────────────────────────────────────────│
       │                       │                        │
       
       │  5. Upload image to Cloudinary
       │─────────────────────────────────>
                               │
                   ┌──────────────────────┐
                   │   Cloudinary CDN     │
                   └──────────────────────┘
```

---

## Troubleshooting

### Vercel Deployment Issues

**Error:** "Build failed"
- **Solution:** Run `npm run build` locally to check for errors
- Check Vercel deployment logs for specific errors

**Error:** "Function execution timed out"
- **Solution:** Optimize database queries, add indexes
- Vercel functions have a 10-second timeout on hobby plan

### MongoDB Connection Issues

**Error:** "Please add your MongoDB URI to .env.local"
- **Solution:** Set `MONGODB_URI` in Vercel environment variables
- For local: Create `.env.local` with `MONGODB_URI=...`

**Error:** "MongoServerError: Authentication failed"
- **Solution:** Check username/password in connection string
- Ensure IP address is whitelisted in MongoDB Atlas

**Error:** "Too many connections"
- **Solution:** Connection pooling is handled automatically
- Check if you're calling `client.connect()` too many times

### API Route Issues

**Error:** "404 - API route not found"
- **Solution:** Check file naming (use `[id].js` for dynamic routes)
- Redeploy after adding new routes
- Clear Vercel cache: `vercel --prod --force`

**Error:** "405 - Method not allowed"
- **Solution:** Check if the function handles the HTTP method (GET/POST/PUT/DELETE)

### Cloudinary Upload Issues

**Error:** "Cloudinary not configured"
- **Solution:** Add all three Cloudinary environment variables
- Verify credentials in Cloudinary dashboard

**Error:** "Upload failed - signature invalid"
- **Solution:** Check API secret is correct
- Ensure no extra spaces in environment variables

### Local Development Issues

**Using Vercel CLI (`vercel dev`):**
- Create `.env.local` with all environment variables
- May need to restart after env changes

**Using Express server:**
- Only for local testing
- Not representative of production behavior
- Update `API_URL` in `src/config.js`

---

## Future Enhancements

### Short-term
1. **JWT Authentication**: Replace static token with proper JWT implementation
2. **Image Optimization**: Add automatic image optimization via Cloudinary
3. **API Caching**: Implement edge caching for GET requests
4. **Error Logging**: Add Sentry or similar for error tracking
5. **MongoDB Indexes**: Add indexes on `id`, `category`, `featured` fields

### Medium-term
1. **Rate Limiting**: Add Vercel Edge Middleware for rate limiting
2. **API Versioning**: Implement API versioning (e.g., `/api/v1/products`)
3. **Search Functionality**: Add full-text search using MongoDB Atlas Search
4. **Pagination**: Implement cursor-based pagination for large datasets
5. **Webhooks**: Add webhook support for events (new product, etc.)

### Long-term
1. **GraphQL API**: Consider GraphQL layer for more flexible queries
2. **Real-time Updates**: Implement WebSocket or Server-Sent Events
3. **Analytics**: Add usage analytics and monitoring
4. **Multi-language**: Support for internationalization (i18n)
5. **Admin Dashboard**: Comprehensive admin panel with analytics
