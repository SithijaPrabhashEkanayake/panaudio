# Pan Audio Website - Backend Documentation

## Overview

The Pan Audio website uses a lightweight Node.js backend built with Express.js to manage products, projects, and admin authentication. It follows a simple client-server architecture where the frontend (React + Vite) communicates with the backend via RESTful API endpoints.

---

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|------------|---------|---------|
| Runtime | Node.js | Latest | JavaScript runtime |
| Framework | Express.js | 5.2.1 | HTTP server and routing |
| File Uploads | Multer | 2.1.0 | Multipart form data handling |
| CORS | cors | 2.8.6 | Cross-origin resource sharing |
| Data Storage | JSON Files | - | File-based persistence |
| Development | nodemon | 3.1.14 | Auto-restart on file changes |
| Concurrency | concurrently | 9.2.1 | Run frontend and backend simultaneously |

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                      Frontend (React)                        │
│                   http://localhost:5173                      │
└─────────────────────────────────────────────────────────────┘
                              │ HTTP/JSON
                              ▼
┌─────────────────────────────────────────────────────────────┐
│                    Backend (Express.js)                     │
│                   http://localhost:5000                      │
│                                                             │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────────────┐  │
│  │   Routes    │  │ Middleware  │  │   File System       │  │
│  │  /api/*     │  │ cors, json  │  │   products.json     │  │
│  │             │  │ security    │  │   projects.json     │  │
│  │             │  │             │  │   uploads/          │  │
│  └─────────────┘  └─────────────┘  └─────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
```

---

## Directory Structure

```
server/
├── server.js           # Main application entry point
├── data/
│   ├── products.json   # Product data storage
│   └── projects.json   # Project data storage
└── uploads/            # Dynamically created directory for uploaded images
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

#### Product Data Structure

```json
{
  "id": "prod-1709654321000",
  "name": "Product Name",
  "brand": "Brand Name",
  "category": "Category Name",
  "description": "Product description",
  "featured": true,
  "image": "/uploads/1709654321000.jpg"
}
```

### Projects API

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| GET | `/api/projects` | Fetch all projects | - |
| POST | `/api/projects` | Create new project | multipart/form-data |
| PUT | `/api/projects/:id` | Update project | multipart/form-data |
| DELETE | `/api/projects/:id` | Delete project | - |

#### Project Data Structure

```json
{
  "id": "proj-1709654321000",
  "name": "Project Name",
  "category": "Category Name",
  "description": "Project description",
  "client": "Client Name",
  "featured": true,
  "image": "/uploads/1709654321000.jpg"
}
```

### Authentication API

| Method | Endpoint | Description | Request Body |
|--------|----------|-------------|--------------|
| POST | `/api/login` | Admin login | `{ username, password }` |

---

## How It Works

### 1. Server Initialization

```javascript
const app = express();
const PORT = process.env.PORT || 5000;
```

The server listens on port 5000 by default. It can be configured via the `PORT` environment variable.

### 2. Middleware Setup

```javascript
app.use(cors());                    // Enable CORS for frontend communication
app.use(express.json());            // Parse JSON request bodies
```

- **CORS**: Allows the React frontend (port 5173) to communicate with the backend (port 5000)
- **JSON Parser**: Enables parsing of JSON request bodies for API calls

### 3. Security Headers

```javascript
app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    res.setHeader('X-Frame-Options', 'DENY');
    res.setHeader('X-XSS-Protection', '1; mode=block');
    res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
    next();
});
```

These headers protect against common web vulnerabilities:
- **X-Content-Type-Options**: Prevents MIME type sniffing
- **X-Frame-Options**: Prevents clickjacking attacks
- **X-XSS-Protection**: Enables browser XSS filtering
- **Referrer-Policy**: Controls referrer information

### 4. File Upload Handling

Multer is configured to handle image uploads:

```javascript
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
```

- **Destination**: Files are saved to `server/uploads/`
- **Filename**: Uses timestamp to ensure unique filenames
- **Auto-creation**: Creates `uploads` directory if it doesn't exist

### 5. Data Persistence

The backend uses JSON files for data storage:

```javascript
const readData = () => {
    const data = fs.readFileSync(dataFile, 'utf8');
    return JSON.parse(data);
};

const writeData = (data) => {
    fs.writeFileSync(dataFile, JSON.stringify(data, null, 4), 'utf8');
};
```

- **Read**: Loads data from JSON file on each request
- **Write**: Saves data with pretty formatting (4-space indentation)
- **Atomic Operations**: File is read and written entirely each time

### 6. CRUD Operations Example

**Create Product:**
```javascript
app.post('/api/products', upload.single('image'), (req, res) => {
    const products = readData();
    const newProduct = {
        id: `prod-${Date.now()}`,
        ...req.body,
        featured: req.body.featured === 'true'
    };

    if (req.file) {
        newProduct.image = `/uploads/${req.file.filename}`;
    }

    products.push(newProduct);
    writeData(products);
    res.status(201).json(newProduct);
});
```

**Delete Product:**
```javascript
app.delete('/api/products/:id', (req, res) => {
    const products = readData();
    const productToDelete = products.find(p => p.id === req.params.id);

    // Delete associated image file
    if (productToDelete && productToDelete.image) {
        const imagePath = path.join(__dirname, productToDelete.image);
        if (fs.existsSync(imagePath)) {
            fs.unlinkSync(imagePath);
        }
    }

    const filteredProducts = products.filter(p => p.id !== req.params.id);
    writeData(filteredProducts);
    res.json({ message: 'Product deleted' });
});
```

### 7. Admin Authentication

Simple token-based authentication:

```javascript
app.post('/api/login', (req, res) => {
    const { username, password } = req.body;
    
    if (username === 'admin' && password === 'PanAudio@2024') {
        res.json({ success: true, token: 'pan-secure-session-token-98f6d' });
    } else {
        res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
});
```

---

## Running the Application

### Development Mode (Recommended)

```bash
npm run dev:all
```

This runs both frontend and backend simultaneously using `concurrently`:
- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

### Manual Start

**Terminal 1 - Backend:**
```bash
npm run server
# or
node server/server.js
```

**Terminal 2 - Frontend:**
```bash
npm run dev
```

### Production Build

```bash
npm run build
```

Builds the React frontend to the `dist/` folder.

---

## Frontend Integration

The frontend communicates with the backend via the `config.js` file:

```javascript
export const API_URL = 'http://localhost:5000';
```

Example API call from the frontend:

```javascript
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

---

## Security Considerations

### Current Implementation
- Hardcoded admin credentials
- Simple token-based authentication
- Security headers enabled

### Recommended Improvements
1. **Environment Variables**: Move credentials to `.env` file
2. **JWT Authentication**: Use JSON Web Tokens for session management
3. **Password Hashing**: Hash passwords with bcrypt
4. **Input Validation**: Add validation middleware (e.g., express-validator)
5. **Rate Limiting**: Prevent brute force attacks
6. **Database**: Consider MongoDB or PostgreSQL for production

---

## Data Flow Diagram

```
┌──────────────┐         ┌──────────────┐         ┌──────────────┐
│   Browser    │         │    Express   │         │  JSON Files  │
│   (React)    │         │   (Backend)  │         │   (Storage)  │
└──────────────┘         └──────────────┘         └──────────────┘
       │                       │                        │
       │  1. POST /api/products (multipart)             │
       │───────────────────────────────────────────────>
       │                       │                        │
       │                       │  2. Save image to /uploads/
       │                       │────────────────────────>
       │                       │                        │
       │                       │  3. Read products.json
       │                       │<────────────────────────
       │                       │                        │
       │                       │  4. Add new product + save
       │                       │────────────────────────>
       │                       │                        │
       │  5. JSON Response     │                        │
       │<───────────────────────────────────────────────
       │                       │                        │
```

---

## Troubleshooting

### Port Already in Use
```bash
# Find and kill process on port 5000
netstat -ano | findstr :5000
taskkill /PID <pid> /F
```

### CORS Errors
Ensure the frontend's API_URL matches the backend URL and CORS is properly configured.

### Upload Issues
Check that the `uploads/` directory exists and has write permissions.

---

## Future Enhancements

1. **Cloud Storage**: Integrate AWS S3 or Cloudinary for image storage
2. **Database**: Migrate to MongoDB for better scalability
3. **Cache Layer**: Add Redis for caching frequently accessed data
4. **API Documentation**: Add Swagger/OpenAPI documentation
5. **Testing**: Implement Jest for unit and integration tests
6. **Logging**: Add structured logging with Winston or Morgan
