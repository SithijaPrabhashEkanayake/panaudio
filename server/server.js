import express from 'express';
import cors from 'cors';
import multer from 'multer';
import { fileURLToPath } from 'url';
import path from 'path';
import dotenv from 'dotenv';
import { v2 as cloudinary } from 'cloudinary';

import { connectDB } from './db.js';
import Product from './models/Product.js';
import Project from './models/Project.js';

// Load environment variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 5000;

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Configure Multer for temporary file storage
const storage = multer.memoryStorage();
const upload = multer({ storage });

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    /\.vercel\.app$/,
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        if (!origin) return callback(null, true);
        const isAllowed = allowedOrigins.some(allowed => {
            if (typeof allowed === 'string') return allowed === origin;
            if (allowed instanceof RegExp) return allowed.test(origin);
            return false;
        });
        if (isAllowed) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(null, true);
        }
    },
    credentials: true
}));

app.use(express.json());

// Security headers
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Helper function to upload to Cloudinary
const uploadToCloudinary = async (fileBuffer, fileName) => {
    return new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream({
            resource_type: 'auto',
            public_id: `pan-audio/${Date.now()}-${fileName}`,
            folder: 'pan-audio'
        }, (error, result) => {
            if (error) reject(error);
            else resolve(result.secure_url);
        });

        stream.end(fileBuffer);
    });
};

// --- PRODUCTS ENDPOINTS ---

// GET all products
app.get('/api/products', async (req, res) => {
    try {
        const products = await Product.find().sort({ createdAt: -1 });
        res.json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Failed to fetch products' });
    }
});

// POST new product
app.post('/api/products', upload.single('image'), async (req, res) => {
    try {
        const { name, brand, category, description, featured } = req.body;

        if (!name || !brand || !category || !description) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProduct = {
            id: `prod-${Date.now()}`,
            name,
            brand,
            category,
            description,
            featured: featured === 'true' || featured === true,
        };

        // Upload image to Cloudinary if provided
        if (req.file) {
            newProduct.image = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        }

        const product = await Product.create(newProduct);
        res.status(201).json(product);
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({ error: 'Failed to create product' });
    }
});

// PUT update product
app.put('/api/products/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, brand, category, description, featured } = req.body;

        const product = await Product.findOne({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }

        // Update fields
        if (name) product.name = name;
        if (brand) product.brand = brand;
        if (category) product.category = category;
        if (description) product.description = description;
        if (featured !== undefined) product.featured = featured === 'true' || featured === true;

        // Upload new image if provided
        if (req.file) {
            product.image = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        }

        await product.save();
        res.json(product);
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({ error: 'Failed to update product' });
    }
});

// DELETE product
app.delete('/api/products/:id', async (req, res) => {
    try {
        const product = await Product.findOneAndDelete({ id: req.params.id });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({ error: 'Failed to delete product' });
    }
});

// --- PROJECTS ENDPOINTS ---

// GET all projects
app.get('/api/projects', async (req, res) => {
    try {
        const projects = await Project.find().sort({ createdAt: -1 });
        res.json(projects);
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({ error: 'Failed to fetch projects' });
    }
});

// POST new project
app.post('/api/projects', upload.single('image'), async (req, res) => {
    try {
        const { name, client, category, scope, featured } = req.body;

        if (!name || !client || !category || !scope) {
            return res.status(400).json({ error: 'Missing required fields' });
        }

        const newProject = {
            id: `proj-${Date.now()}`,
            name,
            client,
            category,
            scope,
            featured: featured === 'true' || featured === true,
        };

        // Upload image to Cloudinary if provided
        if (req.file) {
            newProject.image = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        }

        const project = await Project.create(newProject);
        res.status(201).json(project);
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({ error: 'Failed to create project' });
    }
});

// PUT update project
app.put('/api/projects/:id', upload.single('image'), async (req, res) => {
    try {
        const { name, client, category, scope, featured } = req.body;

        const project = await Project.findOne({ id: req.params.id });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }

        // Update fields
        if (name) project.name = name;
        if (client) project.client = client;
        if (category) project.category = category;
        if (scope) project.scope = scope;
        if (featured !== undefined) project.featured = featured === 'true' || featured === true;

        // Upload new image if provided
        if (req.file) {
            project.image = await uploadToCloudinary(req.file.buffer, req.file.originalname);
        }

        await project.save();
        res.json(project);
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({ error: 'Failed to update project' });
    }
});

// DELETE project
app.delete('/api/projects/:id', async (req, res) => {
    try {
        const project = await Project.findOneAndDelete({ id: req.params.id });
        if (!project) {
            return res.status(404).json({ error: 'Project not found' });
        }
        res.json({ message: 'Project deleted successfully' });
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({ error: 'Failed to delete project' });
    }
});

// --- AUTHENTICATION ---
app.post('/api/login', (req, res) => {
    try {
        const { username, password } = req.body;

        const ADMIN_USER = process.env.ADMIN_USERNAME || 'admin';
        const ADMIN_PASS = process.env.ADMIN_PASSWORD || 'PanAudio@2024';

        if (username === ADMIN_USER && password === ADMIN_PASS) {
            res.json({ success: true, token: 'pan-secure-session-token-98f6d' });
        } else {
            res.status(401).json({ success: false, message: 'Invalid credentials' });
        }
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ error: 'Login failed' });
    }
});

// Health check endpoint
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Pan Audio API is running' });
});

// Initialize server
const startServer = async () => {
    try {
        await connectDB();
        
        app.listen(PORT, () => {
            console.log('\n🚀 Pan Audio Backend Server');
            console.log('📡 Server running on http://localhost:' + PORT);
            console.log('🌍 Environment: ' + (process.env.NODE_ENV || 'development'));
            console.log('🗄️  Database: MongoDB Atlas');
            console.log('☁️  Storage: Cloudinary');
            console.log('✓ Ready for requests\n');
        });
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
