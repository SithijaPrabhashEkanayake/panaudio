import clientPromise from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('panaudio');
    
    const { name, brand, category, description, featured, image } = req.body;
    
    const newProduct = {
      id: `prod-${Date.now()}`,
      name,
      brand: brand || '',
      category,
      description,
      featured: featured === true || featured === 'true',
      image: image || '',
      createdAt: new Date()
    };
    
    await db.collection('products').insertOne(newProduct);
    res.status(201).json(newProduct);
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({ message: 'Error creating product', error: error.message });
  }
}
