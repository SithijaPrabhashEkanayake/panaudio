import express from 'express';
import cors from 'cors';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import multer from 'multer';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 5000;
const dataFile = path.join(__dirname, 'data', 'products.json');

// Configure Multer for Image Uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const uploadDir = path.join(__dirname, 'uploads');
        if (!fs.existsSync(uploadDir)) {
            fs.mkdirSync(uploadDir);
        }
        cb(null, uploadDir);
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });

app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads'))); // Serve images statically

// Helper function to read data
const readData = () => {
    try {
        const data = fs.readFileSync(dataFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading data file:", err);
        return [];
    }
};

// Helper function to write data
const writeData = (data) => {
    try {
        fs.writeFileSync(dataFile, JSON.stringify(data, null, 4), 'utf8');
    } catch (err) {
        console.error("Error writing data file:", err);
    }
};

// GET all products
app.get('/api/products', (req, res) => {
    const products = readData();
    res.json(products);
});

// POST new product (now handles multipart form data + image)
app.post('/api/products', upload.single('image'), (req, res) => {
    console.log("POST /api/products received!");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file ? req.file.originalname : "no file");

    const products = readData();
    const newProduct = {
        id: `prod-${Date.now()}`,
        ...req.body,
        featured: req.body.featured === 'true' // Body parser casts bools to strings in form-data
    };

    if (req.file) {
        newProduct.image = `/uploads/${req.file.filename}`;
    }

    products.push(newProduct);
    writeData(products);
    res.status(201).json(newProduct);
});

// PUT update product (now handles multipart form data + image)
app.put('/api/products/:id', upload.single('image'), (req, res) => {
    console.log("PUT /api/products received!");
    console.log("req.body:", req.body);
    console.log("req.file:", req.file ? req.file.originalname : "no file");

    const products = readData();
    const index = products.findIndex(p => p.id === req.params.id);

    if (index !== -1) {
        const updatedProduct = {
            ...products[index],
            ...req.body,
            id: req.params.id,
            featured: req.body.featured === 'true' || req.body.featured === true
        };

        if (req.file) {
            updatedProduct.image = `/uploads/${req.file.filename}`;
        }

        products[index] = updatedProduct;
        writeData(products);
        res.json(updatedProduct);
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// DELETE delete product
app.delete('/api/products/:id', (req, res) => {
    const products = readData();
    const productToDelete = products.find(p => p.id === req.params.id);

    // Optional: Delete the image file from disk when deleting a product
    if (productToDelete && productToDelete.image) {
        const imagePath = path.join(__dirname, productToDelete.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    const filteredProducts = products.filter(p => p.id !== req.params.id);

    if (products.length !== filteredProducts.length) {
        writeData(filteredProducts);
        res.json({ message: 'Product deleted' });
    } else {
        res.status(404).json({ message: 'Product not found' });
    }
});

// --- PROJECTS ENDPOINTS ---

const projectsDataFile = path.join(__dirname, 'data', 'projects.json');

const readProjectsData = () => {
    try {
        const data = fs.readFileSync(projectsDataFile, 'utf8');
        return JSON.parse(data);
    } catch (err) {
        console.error("Error reading projects data file:", err);
        return [];
    }
};

const writeProjectsData = (data) => {
    try {
        fs.writeFileSync(projectsDataFile, JSON.stringify(data, null, 4), 'utf8');
    } catch (err) {
        console.error("Error writing projects data file:", err);
    }
};

// GET all projects
app.get('/api/projects', (req, res) => {
    const projects = readProjectsData();
    res.json(projects);
});

// POST new project
app.post('/api/projects', upload.single('image'), (req, res) => {
    const projects = readProjectsData();
    const newProject = {
        id: `proj-${Date.now()}`,
        ...req.body,
        featured: req.body.featured === 'true' || req.body.featured === true
    };

    if (req.file) {
        newProject.image = `/uploads/${req.file.filename}`;
    }

    projects.push(newProject);
    writeProjectsData(projects);
    res.status(201).json(newProject);
});

// PUT update project
app.put('/api/projects/:id', upload.single('image'), (req, res) => {
    const projects = readProjectsData();
    const index = projects.findIndex(p => p.id === req.params.id);

    if (index !== -1) {
        const updatedProject = {
            ...projects[index],
            ...req.body,
            id: req.params.id,
            featured: req.body.featured === 'true' || req.body.featured === true
        };

        if (req.file) {
            updatedProject.image = `/uploads/${req.file.filename}`;
        }

        projects[index] = updatedProject;
        writeProjectsData(projects);
        res.json(updatedProject);
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

// DELETE project
app.delete('/api/projects/:id', (req, res) => {
    const projects = readProjectsData();
    const projectToDelete = projects.find(p => p.id === req.params.id);

    if (projectToDelete && projectToDelete.image) {
        const imagePath = path.join(__dirname, projectToDelete.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    const filteredProjects = projects.filter(p => p.id !== req.params.id);

    if (projects.length !== filteredProjects.length) {
        writeProjectsData(filteredProjects);
        res.json({ message: 'Project deleted' });
    } else {
        res.status(404).json({ message: 'Project not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Backend server running on http://localhost:${PORT}`);
});
