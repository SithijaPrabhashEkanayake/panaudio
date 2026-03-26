import clientPromise from '../../lib/db';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('panaudio');
    
    const { name, client: clientName, category, scope, featured, image } = req.body;
    
    const newProject = {
      id: `proj-${Date.now()}`,
      name,
      client: clientName || '',
      category,
      scope: scope || '',
      featured: featured === true || featured === 'true',
      image: image || '',
      createdAt: new Date()
    };
    
    await db.collection('projects').insertOne(newProject);
    res.status(201).json(newProject);
  } catch (error) {
    console.error('Error creating project:', error);
    res.status(500).json({ message: 'Error creating project', error: error.message });
  }
}
