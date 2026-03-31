import clientPromise from '../lib/db';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const productsData = JSON.parse(
  fs.readFileSync(path.join(__dirname, '../../server/data/products.json'), 'utf8')
);

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('panaudio');
    
    await db.collection('products').deleteMany({});
    
    const productsWithIds = productsData.map(p => ({
      ...p,
      _id: p.id
    }));
    
    await db.collection('products').insertMany(productsWithIds);
    
    res.json({ success: true, count: productsData.length });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
}
