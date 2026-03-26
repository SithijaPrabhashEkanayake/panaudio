import clientPromise from '../../lib/db';

export default async function handler(req, res) {
  const { id } = req.query;

  if (!id) {
    return res.status(400).json({ message: 'Project ID required' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('panaudio');

    if (req.method === 'PUT') {
      const { name, client: clientName, category, scope, featured, image } = req.body;
      
      const updatedProject = {
        ...(name && { name }),
        ...(clientName !== undefined && { client: clientName }),
        ...(category && { category }),
        ...(scope !== undefined && { scope }),
        ...(featured !== undefined && { featured: featured === true || featured === 'true' }),
        ...(image && { image }),
        updatedAt: new Date()
      };

      const result = await db.collection('projects').findOneAndUpdate(
        { id },
        { $set: updatedProject },
        { returnOriginal: false }
      );

      if (!result) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      return res.json(result);
    } 
    else if (req.method === 'DELETE') {
      const result = await db.collection('projects').deleteOne({ id });
      
      if (result.deletedCount === 0) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      return res.json({ message: 'Project deleted' });
    }
    else {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  } catch (error) {
    console.error('Database error:', error);
    res.status(500).json({ message: 'Database error', error: error.message });
  }
}
