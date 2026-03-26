# 🎵 Pan Audio Website

A modern, production-ready website for Pan Audio featuring a serverless backend architecture with MongoDB Atlas and Cloudinary CDN.

![Built with React](https://img.shields.io/badge/React-18.2.0-blue)
![Vercel Serverless](https://img.shields.io/badge/Vercel-Serverless-black)
![MongoDB Atlas](https://img.shields.io/badge/MongoDB-Atlas-green)

---

## 🚀 Architecture

**Frontend:** React + Vite + TailwindCSS  
**Backend:** Vercel Serverless Functions  
**Database:** MongoDB Atlas  
**Images:** Cloudinary CDN  
**Hosting:** Vercel (auto-scaling)

---

## ✨ Features

- **Products Management** - Add, edit, delete audio products
- **Projects Showcase** - Display completed audio projects
- **Admin Dashboard** - Secure admin authentication
- **Image Upload** - Cloud-based image hosting with Cloudinary
- **Responsive Design** - Mobile-first, works on all devices
- **Fast & Scalable** - Serverless architecture auto-scales
- **Zero Maintenance** - Fully managed cloud infrastructure

---

## 📁 Project Structure

```
pan5/
├── api/                      # Vercel Serverless Functions
│   ├── lib/db.js            # MongoDB connection
│   ├── login.js             # Authentication
│   ├── upload/              # Image upload to Cloudinary
│   ├── products/            # Product CRUD operations
│   └── projects/            # Project CRUD operations
├── src/                      # React frontend
│   ├── components/          # Reusable components
│   ├── pages/               # Page components
│   └── config.js            # API configuration
├── server/                   # Legacy Express (local dev only)
├── migrate.js               # Data migration script
├── .env.example             # Environment variables template
├── vercel.json              # Vercel configuration
└── package.json             # Dependencies
```

---

## 🎯 Quick Start

### For Immediate Deployment

**See [QUICKSTART.md](./QUICKSTART.md)** - Get deployed in 15 minutes!

### For Detailed Setup

**See [VERCEL_SETUP.md](./VERCEL_SETUP.md)** - Complete guide with troubleshooting

### For Backend Details

**See [BACKEND.md](./BACKEND.md)** - API documentation and architecture

---

## 💻 Local Development

### 1. Install Dependencies

```bash
npm install
```

### 2. Setup Environment Variables

```bash
cp .env.example .env.local
```

Edit `.env.local` with your credentials:
- MongoDB Atlas connection string
- Cloudinary credentials
- Admin username/password

### 3. Run Development Server

**Option A: Frontend only (recommended)**
```bash
npm run dev
```
Runs on `http://localhost:5173`

**Option B: With Vercel CLI (serverless functions locally)**
```bash
npm install -g vercel
vercel dev
```

**Option C: With Express backend (legacy)**
```bash
npm run dev:all
```

---

## 📡 API Endpoints

### Authentication
- `POST /api/login` - Admin login

### Products
- `GET /api/products` - Get all products
- `POST /api/products/new` - Create product
- `PUT /api/products/:id` - Update product
- `DELETE /api/products/:id` - Delete product

### Projects
- `GET /api/projects` - Get all projects
- `POST /api/projects/new` - Create project
- `PUT /api/projects/:id` - Update project
- `DELETE /api/projects/:id` - Delete project

### Upload
- `POST /api/upload` - Upload image to Cloudinary

---

## 🔐 Environment Variables

Required for deployment:

| Variable | Description | Example |
|----------|-------------|---------|
| `MONGODB_URI` | MongoDB connection string | `mongodb+srv://user:pass@cluster.net/panaudio` |
| `ADMIN_USER` | Admin username | `admin` |
| `ADMIN_PASS` | Admin password | `SecurePassword123!` |
| `CLOUDINARY_CLOUD_NAME` | Cloudinary cloud name | `your-cloud-name` |
| `CLOUDINARY_API_KEY` | Cloudinary API key | `123456789012345` |
| `CLOUDINARY_API_SECRET` | Cloudinary API secret | `your-api-secret` |

---

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push code to GitHub
2. Import project in [Vercel Dashboard](https://vercel.com/new)
3. Add environment variables
4. Deploy!

Or use CLI:
```bash
vercel --prod
```

### First Time Setup

1. **MongoDB Atlas** - Create free cluster
2. **Cloudinary** - Create free account
3. **Vercel** - Connect repository
4. **Environment Variables** - Add to Vercel project
5. **Deploy** - Push to main branch

Detailed instructions: [QUICKSTART.md](./QUICKSTART.md)

---

## 📊 Database Schema

### Products Collection
```javascript
{
  id: "prod-1234567890",
  name: "Product Name",
  brand: "Brand Name",
  category: "Category",
  description: "Description",
  featured: true,
  image: "https://res.cloudinary.com/.../image.jpg",
  createdAt: Date,
  updatedAt: Date
}
```

### Projects Collection
```javascript
{
  id: "proj-1234567890",
  name: "Project Name",
  client: "Client Name",
  category: "Category",
  scope: "Project scope",
  featured: true,
  image: "https://res.cloudinary.com/.../project.jpg",
  createdAt: Date,
  updatedAt: Date
}
```

---

## 🔄 Migrating Existing Data

If you have data in JSON files (`server/data/*.json`):

```bash
# Set your MongoDB URI
export MONGODB_URI="mongodb+srv://..."

# Run migration
node migrate.js
```

---

## 🛠️ Built With

- **[React](https://react.dev/)** - UI library
- **[Vite](https://vitejs.dev/)** - Build tool
- **[TailwindCSS](https://tailwindcss.com/)** - CSS framework
- **[Vercel](https://vercel.com/)** - Hosting & serverless functions
- **[MongoDB Atlas](https://www.mongodb.com/cloud/atlas)** - Database
- **[Cloudinary](https://cloudinary.com/)** - Image hosting
- **[Framer Motion](https://www.framer.com/motion/)** - Animations
- **[React Router](https://reactrouter.com/)** - Routing

---

## 📝 Available Scripts

```bash
npm run dev          # Start Vite dev server (frontend only)
npm run build        # Build for production
npm run preview      # Preview production build
npm run server       # Start Express server (legacy, local only)
npm run dev:all      # Run frontend + Express backend
npm run lint         # Lint code
```

---

## 🧪 Testing

```bash
# Test API endpoints
curl https://your-app.vercel.app/api/products
curl https://your-app.vercel.app/api/projects

# Test login
curl -X POST https://your-app.vercel.app/api/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"yourpass"}'
```

---

## 🐛 Troubleshooting

### API Returns 500 Error
- Check MongoDB URI is set correctly
- Verify IP whitelist in MongoDB Atlas (use 0.0.0.0/0)
- Check Vercel deployment logs

### Images Not Uploading
- Verify all 3 Cloudinary env vars are set
- Check Cloudinary dashboard for errors
- Ensure image data is base64 encoded

### Can't Login
- Verify `ADMIN_USER` and `ADMIN_PASS` are set
- Check credentials match
- Clear browser cache/cookies

**More solutions:** [VERCEL_SETUP.md - Troubleshooting](./VERCEL_SETUP.md#-troubleshooting)

---

## 📈 Performance

- **Global CDN** - Content served from edge locations worldwide
- **Auto-scaling** - Handles traffic spikes automatically
- **Fast API** - Sub-100ms response times with MongoDB Atlas
- **Image Optimization** - Cloudinary CDN with automatic optimization
- **Zero Cold Starts** - Vercel's infrastructure keeps functions warm

---

## 🔒 Security

- ✅ HTTPS by default
- ✅ Environment-based configuration
- ✅ No credentials in code
- ✅ MongoDB authentication
- ✅ Stateless architecture
- ⚠️ TODO: JWT authentication
- ⚠️ TODO: Rate limiting
- ⚠️ TODO: Input validation

---

## 📚 Documentation

- **[QUICKSTART.md](./QUICKSTART.md)** - 15-minute deployment guide
- **[VERCEL_SETUP.md](./VERCEL_SETUP.md)** - Complete setup & troubleshooting
- **[BACKEND.md](./BACKEND.md)** - API documentation & architecture
- **[DEPLOYMENT.md](./DEPLOYMENT.md)** - Deployment strategies

---

## 🤝 Contributing

Contributions welcome! Please:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit changes (`git commit -m 'Add amazing feature'`)
4. Push to branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is private and proprietary.

---

## 🆘 Support

Having issues? Check these resources:

1. [QUICKSTART.md](./QUICKSTART.md) - Quick deployment guide
2. [VERCEL_SETUP.md](./VERCEL_SETUP.md) - Detailed troubleshooting
3. [BACKEND.md](./BACKEND.md) - API & architecture docs
4. [Vercel Documentation](https://vercel.com/docs)
5. [MongoDB Atlas Docs](https://www.mongodb.com/docs/atlas/)

---

## ✅ Production Checklist

Before going live:

- [ ] MongoDB Atlas cluster configured
- [ ] Database indexed (`id`, `category`, `featured`)
- [ ] Cloudinary account setup
- [ ] All environment variables set in Vercel
- [ ] Custom domain configured (optional)
- [ ] Admin password changed from default
- [ ] Test all CRUD operations
- [ ] Test image uploads
- [ ] Check mobile responsiveness
- [ ] Verify HTTPS is working
- [ ] Monitor first few days for errors

---

## 🎉 Success!

Your Pan Audio website is now running on a modern, scalable serverless architecture!

**Live Site:** `https://your-app.vercel.app`  
**Admin Panel:** `https://your-app.vercel.app/admin`

**Benefits:**
- ✅ Zero server maintenance
- ✅ Auto-scaling to handle any traffic
- ✅ Global CDN for fast load times
- ✅ Free SSL certificates
- ✅ 99.99% uptime SLA
- ✅ One-click deployments

---

**Built with ❤️ for Pan Audio**
