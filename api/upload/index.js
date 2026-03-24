export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { imageData, folder } = req.body;

  if (!imageData) {
    return res.status(400).json({ message: 'No image data provided' });
  }

  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (!cloudName || !apiKey || !apiSecret) {
    return res.status(500).json({ message: 'Cloudinary not configured' });
  }

  try {
    const timestamp = Math.round(Date.now() / 1000);
    const folderName = folder || 'panaudio';
    
    const signatureResponse = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        file: imageData,
        folder: folderName,
        api_key: apiKey,
        timestamp: timestamp,
      })
    });

    const result = await signatureResponse.json();
    
    if (result.error) {
      return res.status(400).json({ message: result.error.message });
    }

    res.json({ 
      url: result.secure_url,
      publicId: result.public_id
    });
  } catch (error) {
    console.error('Upload error:', error);
    res.status(500).json({ message: 'Upload failed', error: error.message });
  }
}
