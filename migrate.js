import { MongoClient } from 'mongodb';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load MongoDB URI from environment or prompt
const uri = process.env.MONGODB_URI || 'mongodb+srv://YOUR_USERNAME:YOUR_PASSWORD@YOUR_CLUSTER.mongodb.net/?retryWrites=true&w=majority';

if (!uri || uri.includes('YOUR_')) {
  console.error('❌ Please set MONGODB_URI environment variable or edit this file with your MongoDB connection string');
  process.exit(1);
}

const client = new MongoClient(uri);

async function migrate() {
  try {
    console.log('🔌 Connecting to MongoDB...');
    await client.connect();
    console.log('✅ Connected to MongoDB');
    
    const db = client.db('panaudio');
    
    // Migrate products
    const productsFile = path.join(__dirname, 'server', 'data', 'products.json');
    if (fs.existsSync(productsFile)) {
      const productsData = fs.readFileSync(productsFile, 'utf8');
      const products = JSON.parse(productsData);
      
      if (products.length > 0) {
        console.log(`\n📦 Found ${products.length} products to migrate`);
        
        // Add timestamps if not present
        const productsWithTimestamps = products.map(p => ({
          ...p,
          createdAt: p.createdAt || new Date(),
          updatedAt: p.updatedAt || new Date()
        }));
        
        // Clear existing products (optional - comment out if you want to keep existing data)
        await db.collection('products').deleteMany({});
        
        await db.collection('products').insertMany(productsWithTimestamps);
        console.log(`✅ Migrated ${products.length} products to MongoDB`);
      } else {
        console.log('⚠️  No products found in products.json');
      }
    } else {
      console.log('⚠️  products.json not found');
    }
    
    // Migrate projects
    const projectsFile = path.join(__dirname, 'server', 'data', 'projects.json');
    if (fs.existsSync(projectsFile)) {
      const projectsData = fs.readFileSync(projectsFile, 'utf8');
      const projects = JSON.parse(projectsData);
      
      if (projects.length > 0) {
        console.log(`\n📁 Found ${projects.length} projects to migrate`);
        
        // Add timestamps if not present
        const projectsWithTimestamps = projects.map(p => ({
          ...p,
          createdAt: p.createdAt || new Date(),
          updatedAt: p.updatedAt || new Date()
        }));
        
        // Clear existing projects (optional - comment out if you want to keep existing data)
        await db.collection('projects').deleteMany({});
        
        await db.collection('projects').insertMany(projectsWithTimestamps);
        console.log(`✅ Migrated ${projects.length} projects to MongoDB`);
      } else {
        console.log('⚠️  No projects found in projects.json');
      }
    } else {
      console.log('⚠️  projects.json not found');
    }
    
    console.log('\n🎉 Migration completed successfully!');
    
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await client.close();
    console.log('👋 Disconnected from MongoDB');
  }
}

// Run migration
migrate();
