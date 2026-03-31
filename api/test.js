import clientPromise from '../lib/db';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    await client.db('panaudio').command({ ping: 1 });
    res.json({ status: 'ok', message: 'MongoDB connected!' });
  } catch (error) {
    res.status(500).json({ status: 'error', message: error.message });
  }
}
