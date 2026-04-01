import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Product from './server/models/Product.js';
import Project from './server/models/Project.js';

dotenv.config();

const migrateData = async () => {
    try {
        // Connect to MongoDB
        console.log('🔗 Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('✓ Connected to MongoDB\n');

        // Clear existing data (optional - uncomment if needed)
        // await Product.deleteMany({});
        // await Project.deleteMany({});
        // console.log('Cleared existing data\n');

        // Migrate Products
        console.log('📦 Migrating products...');
        const productsPath = path.join(process.cwd(), 'server', 'data', 'products.json');
        if (fs.existsSync(productsPath)) {
            const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
            
            for (const product of productsData) {
                try {
                    const exists = await Product.findOne({ id: product.id });
                    if (!exists) {
                        await Product.create({
                            id: product.id,
                            name: product.name || 'Unnamed',
                            brand: product.brand || 'Unknown',
                            category: product.category || 'Uncategorized',
                            description: product.description || '',
                            featured: product.featured || false,
                            image: product.image || null,
                        });
                        console.log(`  ✓ Created: ${product.name}`);
                    } else {
                        console.log(`  ⊘ Skipped (exists): ${product.name}`);
                    }
                } catch (err) {
                    console.error(`  ✗ Error creating ${product.name}:`, err.message);
                }
            }
            console.log(`✓ Migrated ${productsData.length} products\n`);
        } else {
            console.log('⊘ products.json not found, skipping products\n');
        }

        // Migrate Projects
        console.log('📁 Migrating projects...');
        const projectsPath = path.join(process.cwd(), 'server', 'data', 'projects.json');
        if (fs.existsSync(projectsPath)) {
            const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
            
            for (const project of projectsData) {
                try {
                    const exists = await Project.findOne({ id: project.id });
                    if (!exists) {
                        await Project.create({
                            id: project.id,
                            name: project.name || 'Unnamed',
                            client: project.client || 'Unknown',
                            category: project.category || 'Uncategorized',
                            scope: project.scope || '',
                            featured: project.featured || false,
                            image: project.image || null,
                        });
                        console.log(`  ✓ Created: ${project.name}`);
                    } else {
                        console.log(`  ⊘ Skipped (exists): ${project.name}`);
                    }
                } catch (err) {
                    console.error(`  ✗ Error creating ${project.name}:`, err.message);
                }
            }
            console.log(`✓ Migrated ${projectsData.length} projects\n`);
        } else {
            console.log('⊘ projects.json not found, skipping projects\n');
        }

        // Summary
        const productCount = await Product.countDocuments();
        const projectCount = await Project.countDocuments();
        
        console.log('='.repeat(50));
        console.log('🎉 Migration complete!');
        console.log(`   Products in DB: ${productCount}`);
        console.log(`   Projects in DB: ${projectCount}`);
        console.log('='.repeat(50) + '\n');

        await mongoose.disconnect();
        process.exit(0);
    } catch (error) {
        console.error('❌ Migration failed:', error.message);
        process.exit(1);
    }
};

migrateData();
