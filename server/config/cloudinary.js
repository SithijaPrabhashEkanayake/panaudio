import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';
import multer from 'multer';

// Configure Cloudinary
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// Verify configuration
if (!process.env.CLOUDINARY_CLOUD_NAME || 
    !process.env.CLOUDINARY_API_KEY || 
    !process.env.CLOUDINARY_API_SECRET) {
    console.warn('⚠️  Cloudinary credentials not configured. Image uploads will fail.');
}

// Create Cloudinary storage for multer
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: async (req, file) => {
        // Determine folder based on the route
        let folder = 'panaudio/general';
        if (req.path.includes('products')) {
            folder = 'panaudio/products';
        } else if (req.path.includes('projects')) {
            folder = 'panaudio/projects';
        }
        
        return {
            folder: folder,
            allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'avif'],
            transformation: [
                { width: 1920, height: 1080, crop: 'limit' }, // Max dimensions
                { quality: 'auto:good' }, // Automatic quality optimization
                { fetch_format: 'auto' } // Automatic format selection (WebP when supported)
            ],
            public_id: `${Date.now()}-${file.originalname.split('.')[0]}` // Unique filename
        };
    }
});

// File filter to only accept images
const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/gif',
        'image/webp',
        'image/avif'
    ];
    
    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only JPEG, PNG, GIF, WebP, and AVIF images are allowed.'), false);
    }
};

// Create multer upload instance
export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max file size
    },
    fileFilter: fileFilter
});

// Helper function to delete image from Cloudinary
export const deleteImage = async (imageUrl) => {
    try {
        // Extract public_id from Cloudinary URL
        // URL format: https://res.cloudinary.com/{cloud_name}/image/upload/{transformations}/{public_id}.{format}
        const matches = imageUrl.match(/\/panaudio\/[^/]+\/[^.]+/);
        if (matches) {
            const publicId = matches[0].substring(1); // Remove leading slash
            const result = await cloudinary.uploader.destroy(publicId);
            console.log('Deleted image from Cloudinary:', publicId, result);
            return result;
        }
    } catch (error) {
        console.error('Error deleting image from Cloudinary:', error);
    }
};

export default cloudinary;
