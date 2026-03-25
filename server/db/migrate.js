import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcrypt';
import pool, { query } from './index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/**
 * Migration script to set up database and migrate data from JSON files
 * Run with: node server/db/migrate.js
 */

async function runMigration() {
    console.log('🚀 Starting database migration...\n');
    
    try {
        // Step 1: Create tables from schema
        console.log('📋 Step 1: Creating database schema...');
        const schemaSQL = fs.readFileSync(
            path.join(__dirname, 'schema.sql'),
            'utf8'
        );
        await query(schemaSQL);
        console.log('✅ Schema created successfully\n');
        
        // Step 2: Check if products.json exists and migrate data
        const productsPath = path.join(__dirname, '..', 'data', 'products.json');
        if (fs.existsSync(productsPath)) {
            console.log('📦 Step 2: Migrating products from JSON...');
            const productsData = JSON.parse(fs.readFileSync(productsPath, 'utf8'));
            
            for (const product of productsData) {
                try {
                    await query(
                        `INSERT INTO products (id, name, brand, category, description, featured, image)
                         VALUES ($1, $2, $3, $4, $5, $6, $7)
                         ON CONFLICT (id) DO UPDATE SET
                            name = EXCLUDED.name,
                            brand = EXCLUDED.brand,
                            category = EXCLUDED.category,
                            description = EXCLUDED.description,
                            featured = EXCLUDED.featured,
                            image = EXCLUDED.image`,
                        [
                            product.id,
                            product.name,
                            product.brand,
                            product.category,
                            product.description || '',
                            product.featured || false,
                            product.image || null
                        ]
                    );
                } catch (err) {
                    console.error(`Error migrating product ${product.id}:`, err.message);
                }
            }
            console.log(`✅ Migrated ${productsData.length} products\n`);
        } else {
            console.log('⚠️  No products.json found, skipping product migration\n');
        }
        
        // Step 3: Check if projects.json exists and migrate data
        const projectsPath = path.join(__dirname, '..', 'data', 'projects.json');
        if (fs.existsSync(projectsPath)) {
            console.log('📂 Step 3: Migrating projects from JSON...');
            const projectsData = JSON.parse(fs.readFileSync(projectsPath, 'utf8'));
            
            for (const project of projectsData) {
                try {
                    await query(
                        `INSERT INTO projects (id, name, client, category, scope, description, featured, image)
                         VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
                         ON CONFLICT (id) DO UPDATE SET
                            name = EXCLUDED.name,
                            client = EXCLUDED.client,
                            category = EXCLUDED.category,
                            scope = EXCLUDED.scope,
                            description = EXCLUDED.description,
                            featured = EXCLUDED.featured,
                            image = EXCLUDED.image`,
                        [
                            project.id,
                            project.name,
                            project.client || null,
                            project.category,
                            project.scope || null,
                            project.description || null,
                            project.featured || false,
                            project.image || null
                        ]
                    );
                } catch (err) {
                    console.error(`Error migrating project ${project.id}:`, err.message);
                }
            }
            console.log(`✅ Migrated ${projectsData.length} projects\n`);
        } else {
            console.log('⚠️  No projects.json found, skipping project migration\n');
        }
        
        // Step 4: Create default admin user
        console.log('👤 Step 4: Creating admin user...');
        const adminUsername = process.env.ADMIN_USERNAME || 'admin';
        const adminPassword = process.env.ADMIN_PASSWORD || 'PanAudio@2024';
        const hashedPassword = await bcrypt.hash(adminPassword, 10);
        
        try {
            await query(
                `INSERT INTO admin_users (username, password_hash)
                 VALUES ($1, $2)
                 ON CONFLICT (username) DO UPDATE SET
                    password_hash = EXCLUDED.password_hash`,
                [adminUsername, hashedPassword]
            );
            console.log(`✅ Admin user "${adminUsername}" created/updated\n`);
        } catch (err) {
            console.error('Error creating admin user:', err.message);
        }
        
        // Step 5: Verify migration
        console.log('🔍 Step 5: Verifying migration...');
        const productCount = await query('SELECT COUNT(*) FROM products');
        const projectCount = await query('SELECT COUNT(*) FROM projects');
        const adminCount = await query('SELECT COUNT(*) FROM admin_users');
        
        console.log(`✅ Products in database: ${productCount.rows[0].count}`);
        console.log(`✅ Projects in database: ${projectCount.rows[0].count}`);
        console.log(`✅ Admin users in database: ${adminCount.rows[0].count}\n`);
        
        console.log('🎉 Migration completed successfully!');
        console.log('\n📝 Next steps:');
        console.log('1. Update your .env file with DATABASE_URL');
        console.log('2. Set CLOUDINARY credentials');
        console.log('3. Deploy to Railway');
        console.log('4. Test the API endpoints\n');
        
    } catch (error) {
        console.error('❌ Migration failed:', error);
        throw error;
    } finally {
        await pool.end();
    }
}

// Run migration if this file is executed directly
if (import.meta.url === `file://${process.argv[1]}`) {
    runMigration()
        .then(() => process.exit(0))
        .catch((err) => {
            console.error(err);
            process.exit(1);
        });
}

export default runMigration;
