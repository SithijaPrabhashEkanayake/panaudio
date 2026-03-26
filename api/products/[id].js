import clientPromise from '../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Product ID required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('panaudio');

    if (req.method === 'PUT') {
      const { name, brand, category, description, featured, image } = req.body;
      
      const updatedProduct = {
        ...(name && { name }),
        ...(brand !== undefined && { brand }),
        ...(category && { category }),
        ...(description && { description }),
        ...(featured !== undefined && { featured: featured === true || featured === 'true' }),
        ...(image && { image }),
        updatedAt: new Date()
      };

      const result = await db.collection('products').findOneAndUpdate(
        { id },
        { $set: updatedProduct },
        { returnOriginal: false }
      );

      if (!result) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      return res.json(result);
    } 
    else if (req.method === 'DELETE') {
      const result = await db.collection('products').deleteOne({ id });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Product not found' });
      }
      
      return res.json({ message: 'Product deleted' });
    }
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
}
