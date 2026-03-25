import pg from 'pg';
const { Pool } = pg;

// Database connection configuration
const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false // Required for Neon
    } : false,
    max: 20, // Maximum number of clients in the pool
    idleTimeoutMillis: 30000, // Close idle clients after 30 seconds
    connectionTimeoutMillis: 2000, // Return an error after 2 seconds if connection fails
});

// Test connection on startup
pool.on('connect', () => {
    console.log('✅ Connected to PostgreSQL database');
});

pool.on('error', (err) => {
    console.error('❌ Unexpected error on idle client', err);
    process.exit(-1);
});

// Graceful shutdown
process.on('SIGINT', async () => {
    await pool.end();
    console.log('🔌 Database connection pool closed');
    process.exit(0);
});

process.on('SIGTERM', async () => {
    await pool.end();
    console.log('🔌 Database connection pool closed');
    process.exit(0);
});

// Helper function to execute queries with error handling
export const query = async (text, params) => {
    const start = Date.now();
    try {
        const res = await pool.query(text, params);
        const duration = Date.now() - start;
        console.log('Executed query', { text, duration, rows: res.rowCount });
        return res;
    } catch (error) {
        console.error('Database query error:', error);
        throw error;
    }
};

// Helper function to get a client from the pool for transactions
export const getClient = async () => {
    const client = await pool.connect();
    const query = client.query.bind(client);
    const release = client.release.bind(client);
    
    // Set a timeout of 5 seconds for queries
    const timeout = setTimeout(() => {
        console.error('Client query timeout');
        client.release();
    }, 5000);
    
    client.query = (...args) => {
        client.lastQuery = args;
        return query(...args);
    };
    
    client.release = () => {
        clearTimeout(timeout);
        client.query = query;
        client.release = release;
        return release();
    };
    
    return client;
};

export default pool;
