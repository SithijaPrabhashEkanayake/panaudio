import ImageKit from 'imagekit';
import multer from 'multer';

// Initialize ImageKit
const imagekit = new ImageKit({
    publicKey: process.env.IMAGEKIT_PUBLIC_KEY,
    privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
    urlEndpoint: process.env.IMAGEKIT_URL_ENDPOINT
});

// Verify configuration
if (!process.env.IMAGEKIT_PUBLIC_KEY || 
    !process.env.IMAGEKIT_PRIVATE_KEY || 
    !process.env.IMAGEKIT_URL_ENDPOINT) {
    console.warn('⚠️  ImageKit credentials not configured. Image uploads will fail.');
}

// Multer memory storage (buffer in memory, don't save to disk)
const storage = multer.memoryStorage();

export const upload = multer({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024 // 10MB max
    },
    fileFilter: (req, file, cb) => {
        const allowedTypes = [
            'image/jpeg',
            'image/jpg',
            'image/png',
            'image/gif',
            'image/webp',
            'image/avif'
        ];
        
        if (allowedTypes.includes(file.mimetype)) {
            cb(null, true);
        } else {
            cb(new Error('Invalid file type. Only JPEG, PNG, GIF, WebP, and AVIF are allowed.'), false);
        }
    }
});

/**
 * Upload image to ImageKit
 * @param {Object} file - Multer file object with buffer
 * @param {String} folder - ImageKit folder path (e.g., 'panaudio/products')
 * @returns {String} - Image URL from ImageKit CDN
 */
export const uploadToImageKit = async (file, folder = 'panaudio') => {
    try {
        if (!file || !file.buffer) {
            throw new Error('No file buffer provided');
        }
        
        const result = await imagekit.upload({
            file: file.buffer, // File buffer from memory
            fileName: `${Date.now()}-${file.originalname}`,
            folder: folder,
            useUniqueFileName: true,
            transformation: {
                post: [
                    {
                        type: 'transformation',
                        value: 'w-1920,h-1080,c-at_max,q-80,f-auto' // Max 1920x1080, auto WebP
                    }
                ]
            },
            tags: ['panaudio', 'upload'] // For organization
        });
        
        console.log('ImageKit upload successful:', result.fileId);
        return result.url;
        
    } catch (error) {
        console.error('ImageKit upload error:', error);
        throw new Error(`Failed to upload image: ${error.message}`);
    }
};

/**
 * Delete image from ImageKit
 * @param {String} imageUrl - Full ImageKit URL or file ID
 */
export const deleteFromImageKit = async (imageUrl) => {
    try {
        if (!imageUrl) return;
        
        // Extract fileId from URL
        // URL format: https://ik.imagekit.io/demo/sample.jpg
        let fileId;
        
        if (imageUrl.includes('ik.imagekit.io')) {
            // Extract fileId from URL path
            const urlParts = imageUrl.split('/');
            const fileName = urlParts[urlParts.length - 1].split('?')[0];
            
            // List files and find by name
            const files = await imagekit.listFiles({
                searchQuery: `name="${fileName}"`
            });
            
            if (files.length > 0) {
                fileId = files[0].fileId;
            }
        } else {
            fileId = imageUrl; // Assume it's already a fileId
        }
        
        if (fileId) {
            await imagekit.deleteFile(fileId);
            console.log('Deleted image from ImageKit:', fileId);
        }
        
    } catch (error) {
        console.error('ImageKit delete error:', error.message);
        // Don't throw - deletion errors shouldn't stop the request
    }
};

/**
 * Get optimized image URL with transformations
 * @param {String} imageUrl - Original ImageKit URL
 * @param {Object} options - Transformation options
 * @returns {String} - Transformed URL
 */
export const getOptimizedImageUrl = (imageUrl, options = {}) => {
    const {
        width = 800,
        height = 600,
        quality = 80,
        format = 'auto'
    } = options;
    
    return imagekit.url({
        src: imageUrl,
        transformation: [{
            width: width,
            height: height,
            quality: quality,
            format: format
        }]
    });
};

export default imagekit;
