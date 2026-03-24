export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { username, password } = req.body;
  
  const ADMIN_USER = process.env.ADMIN_USER || 'admin';
  const ADMIN_PASS = process.env.ADMIN_PASS || 'PanAudio@2024';

  if (username === ADMIN_USER && password === ADMIN_PASS) {
    res.json({ success: true, token: 'pan-secure-session-token-98f6d' });
  } else {
    res.status(401).json({ success: false, message: 'Invalid credentials' });
  }
}
