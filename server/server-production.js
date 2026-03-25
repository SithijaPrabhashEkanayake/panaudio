import express from 'express';
import cors from 'cors';
import bcrypt from 'bcrypt';
import { query, getClient } from './db/index.js';
import { upload, deleteImage } from './config/cloudinary.js';
import { authMiddleware, generateToken } from './middleware/auth.js';

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - supports both development and production
const allowedOrigins = [
    'http://localhost:5173',
    'http://localhost:3000',
    process.env.FRONTEND_URL,
    /\.vercel\.app$/,  // All Vercel deployments
].filter(Boolean);

app.use(cors({
    origin: function(origin, callback) {
        // Allow requests with no origin (like mobile apps or curl)
        if (!origin) return callback(null, true);
        
        // Check if origin is allowed
        const isAllowed = allowedOrigins.some(allowed => {
            if (typeof allowed === 'string') return allowed === origin;
            if (allowed instanceof RegExp) return allowed.test(origin);
            return false;
        });
        
        if (isAllowed) {
            callback(null, true);
        } else {
            console.warn(`CORS blocked origin: ${origin}`);
            callback(null, process.env.NODE_ENV !== 'production'); // Allow in development
        }
    },
    credentials: true
}));

app.use(express.json());

// Security headers middleware
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});

// Health check endpoint
app.get('/health', (req, res) => {
    res.json({ 
        status: 'ok', 
        timestamp: new Date().toISOString(),
        environment: process.env.NODE_ENV || 'development'
    });
});

// ============================================================================
// AUTHENTICATION ROUTES
// ============================================================================

/**
 * POST /api/auth/login
 * Login with username and password, returns JWT token
 */
app.post('/api/auth/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        if (!username || !password) {
            return res.status(400).json({
                success: false,
                message: 'Username and password are required'
            });
        }
        
        // Find user in database
        const result = await query(
            'SELECT * FROM admin_users WHERE username = $1',
            [username]
        );
        
        if (result.rows.length === 0) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        const user = result.rows[0];
        
        // Verify password
        const passwordMatch = await bcrypt.compare(password, user.password_hash);
        
        if (!passwordMatch) {
            return res.status(401).json({
                success: false,
                message: 'Invalid credentials'
            });
        }
        
        // Update last login
        await query(
            'UPDATE admin_users SET last_login = CURRENT_TIMESTAMP WHERE id = $1',
            [user.id]
        );
        
        // Generate JWT token
        const token = generateToken({
            id: user.id,
            username: user.username
        });
        
        res.json({
            success: true,
            token,
            user: {
                id: user.id,
                username: user.username
            }
        });
        
    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({
            success: false,
            message: 'Server error during authentication'
        });
    }
});

// ============================================================================
// PRODUCTS ROUTES
// ============================================================================

/**
 * GET /api/products
 * Fetch all products
 */
app.get('/api/products', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM products ORDER BY created_at DESC'
        );
        
        res.json(result.rows);
        
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching products'
        });
    }
});

/**
 * POST /api/products
 * Create new product (requires authentication)
 */
app.post('/api/products', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { name, brand, category, description, featured } = req.body;
        
        if (!name || !brand || !category) {
            return res.status(400).json({
                success: false,
                message: 'Name, brand, and category are required'
            });
        }
        
        // Get image URL from Cloudinary
        const imageUrl = req.file ? req.file.path : null;
        
        const result = await query(
            `INSERT INTO products (id, name, brand, category, description, featured, image)
             VALUES ($1, $2, $3, $4, $5, $6, $7)
             RETURNING *`,
            [
                `prod-${Date.now()}`,
                name,
                brand,
                category,
                description || '',
                featured === 'true' || featured === true,
                imageUrl
            ]
        );
        
        res.status(201).json(result.rows[0]);
        
    } catch (error) {
        console.error('Error creating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating product'
        });
    }
});

/**
 * PUT /api/products/:id
 * Update product (requires authentication)
 */
app.put('/api/products/:id', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, brand, category, description, featured } = req.body;
        
        // Check if product exists
        const existingProduct = await query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );
        
        if (existingProduct.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // If new image uploaded, delete old one from Cloudinary
        let imageUrl = existingProduct.rows[0].image;
        if (req.file) {
            if (imageUrl) {
                await deleteImage(imageUrl);
            }
            imageUrl = req.file.path;
        }
        
        const result = await query(
            `UPDATE products 
             SET name = $1, brand = $2, category = $3, description = $4, 
                 featured = $5, image = $6, updated_at = CURRENT_TIMESTAMP
             WHERE id = $7
             RETURNING *`,
            [
                name || existingProduct.rows[0].name,
                brand || existingProduct.rows[0].brand,
                category || existingProduct.rows[0].category,
                description !== undefined ? description : existingProduct.rows[0].description,
                featured !== undefined ? (featured === 'true' || featured === true) : existingProduct.rows[0].featured,
                imageUrl,
                id
            ]
        );
        
        res.json(result.rows[0]);
        
    } catch (error) {
        console.error('Error updating product:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating product'
        });
    }
});

/**
 * DELETE /api/products/:id
 * Delete product (requires authentication)
 */
app.delete('/api/products/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get product to delete image from Cloudinary
        const existingProduct = await query(
            'SELECT * FROM products WHERE id = $1',
            [id]
        );
        
        if (existingProduct.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Product not found'
            });
        }
        
        // Delete image from Cloudinary
        if (existingProduct.rows[0].image) {
            await deleteImage(existingProduct.rows[0].image);
        }
        
        // Delete product from database
        await query('DELETE FROM products WHERE id = $1', [id]);
        
        res.json({
            success: true,
            message: 'Product deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting product:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting product'
        });
    }
});

// ============================================================================
// PROJECTS ROUTES
// ============================================================================

/**
 * GET /api/projects
 * Fetch all projects
 */
app.get('/api/projects', async (req, res) => {
    try {
        const result = await query(
            'SELECT * FROM projects ORDER BY created_at DESC'
        );
        
        res.json(result.rows);
        
    } catch (error) {
        console.error('Error fetching projects:', error);
        res.status(500).json({
            success: false,
            message: 'Error fetching projects'
        });
    }
});

/**
 * POST /api/projects
 * Create new project (requires authentication)
 */
app.post('/api/projects', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { name, client, category, scope, description, featured } = req.body;
        
        if (!name || !category) {
            return res.status(400).json({
                success: false,
                message: 'Name and category are required'
            });
        }
        
        // Get image URL from Cloudinary
        const imageUrl = req.file ? req.file.path : null;
        
        const result = await query(
            `INSERT INTO projects (id, name, client, category, scope, description, featured, image)
             VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
             RETURNING *`,
            [
                `proj-${Date.now()}`,
                name,
                client || null,
                category,
                scope || null,
                description || null,
                featured === 'true' || featured === true,
                imageUrl
            ]
        );
        
        res.status(201).json(result.rows[0]);
        
    } catch (error) {
        console.error('Error creating project:', error);
        res.status(500).json({
            success: false,
            message: 'Error creating project'
        });
    }
});

/**
 * PUT /api/projects/:id
 * Update project (requires authentication)
 */
app.put('/api/projects/:id', authMiddleware, upload.single('image'), async (req, res) => {
    try {
        const { id } = req.params;
        const { name, client, category, scope, description, featured } = req.body;
        
        // Check if project exists
        const existingProject = await query(
            'SELECT * FROM projects WHERE id = $1',
            [id]
        );
        
        if (existingProject.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // If new image uploaded, delete old one from Cloudinary
        let imageUrl = existingProject.rows[0].image;
        if (req.file) {
            if (imageUrl) {
                await deleteImage(imageUrl);
            }
            imageUrl = req.file.path;
        }
        
        const result = await query(
            `UPDATE projects 
             SET name = $1, client = $2, category = $3, scope = $4, 
                 description = $5, featured = $6, image = $7, updated_at = CURRENT_TIMESTAMP
             WHERE id = $8
             RETURNING *`,
            [
                name || existingProject.rows[0].name,
                client !== undefined ? client : existingProject.rows[0].client,
                category || existingProject.rows[0].category,
                scope !== undefined ? scope : existingProject.rows[0].scope,
                description !== undefined ? description : existingProject.rows[0].description,
                featured !== undefined ? (featured === 'true' || featured === true) : existingProject.rows[0].featured,
                imageUrl,
                id
            ]
        );
        
        res.json(result.rows[0]);
        
    } catch (error) {
        console.error('Error updating project:', error);
        res.status(500).json({
            success: false,
            message: 'Error updating project'
        });
    }
});

/**
 * DELETE /api/projects/:id
 * Delete project (requires authentication)
 */
app.delete('/api/projects/:id', authMiddleware, async (req, res) => {
    try {
        const { id } = req.params;
        
        // Get project to delete image from Cloudinary
        const existingProject = await query(
            'SELECT * FROM projects WHERE id = $1',
            [id]
        );
        
        if (existingProject.rows.length === 0) {
            return res.status(404).json({
                success: false,
                message: 'Project not found'
            });
        }
        
        // Delete image from Cloudinary
        if (existingProject.rows[0].image) {
            await deleteImage(existingProject.rows[0].image);
        }
        
        // Delete project from database
        await query('DELETE FROM projects WHERE id = $1', [id]);
        
        res.json({
            success: true,
            message: 'Project deleted successfully'
        });
        
    } catch (error) {
        console.error('Error deleting project:', error);
        res.status(500).json({
            success: false,
            message: 'Error deleting project'
        });
    }
});

// ============================================================================
// ERROR HANDLING
// ============================================================================

// 404 handler
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Route not found'
    });
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('Global error handler:', err);
    
    // Multer errors
    if (err.code === 'LIMIT_FILE_SIZE') {
        return res.status(400).json({
            success: false,
            message: 'File too large. Maximum size is 10MB.'
        });
    }
    
    if (err.message.includes('Invalid file type')) {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    
    res.status(500).json({
        success: false,
        message: 'Internal server error'
    });
});

// ============================================================================
// START SERVER
// ============================================================================

app.listen(PORT, () => {
    console.log(`\n🚀 Pan Audio Backend Server`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━`);
    console.log(`📡 Server:      http://localhost:${PORT}`);
    console.log(`🌍 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔒 CORS:        ${allowedOrigins.filter(o => typeof o === 'string').join(', ')}`);
    console.log(`💾 Database:    ${process.env.DATABASE_URL ? 'Connected' : 'Not configured'}`);
    console.log(`☁️  Cloudinary:  ${process.env.CLOUDINARY_CLOUD_NAME ? 'Configured' : 'Not configured'}`);
    console.log(`━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    
    if (!process.env.DATABASE_URL) {
        console.warn('⚠️  WARNING: DATABASE_URL not set. Database operations will fail.');
    }
    
    if (!process.env.CLOUDINARY_CLOUD_NAME) {
        console.warn('⚠️  WARNING: Cloudinary not configured. Image uploads will fail.');
    }
});

export default app;
