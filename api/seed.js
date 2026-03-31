import clientPromise from '../lib/db';

const productsData = [
    { id: "prod-10", name: "DSPPA Digitally Steerable Speaker", brand: "DSPPA", category: "Audio Visual Solutions", description: "Advanced line-array digitally steerable speaker with software and hardware DSP components.", featured: true, image: "" },
    { id: "prod-11", name: "DSPPA Professional Speaker", brand: "DSPPA", category: "Audio Visual Solutions", description: "Professional speakers as essential components of conference systems.", featured: true, image: "" },
    { id: "prod-12", name: "DSPPA Professional Amplifier", brand: "DSPPA", category: "Audio Visual Solutions", description: "Professional amplifier system with balanced power and audio signal options.", featured: false, image: "" },
    { id: "prod-13", name: "DSPPA Audio Processor", brand: "DSPPA", category: "Audio Visual Solutions", description: "Top-of-the-line audio processor with precise equalization.", featured: false, image: "" },
    { id: "prod-14", name: "DSPPA Audio Conferencing System", brand: "DSPPA", category: "Audio Visual Solutions", description: "Complete digital conference system for rooms of all sizes.", featured: false, image: "" },
    { id: "prod-15", name: "DSPPA Line Array Speaker", brand: "DSPPA", category: "Audio Visual Solutions", description: "Easy to configure line array speaker system.", featured: false, image: "" },
    { id: "prod-16", name: "Megaphone Solution", category: "Audio Visual Solutions", description: "Professional megaphone for police and crowd control.", featured: false, image: "" },
    { id: "prod-17", name: "JBL Subwoofers", brand: "JBL", category: "Audio Visual Solutions", description: "Feel the room shake with low-frequency bass.", featured: false, image: "" },
    { id: "prod-18", name: "JBL Bookshelf Speakers", brand: "JBL", category: "Audio Visual Solutions", description: "Compact and powerful JBL bookshelf speakers.", featured: false, image: "" },
    { id: "prod-19", name: "JBL Stereo Hi-Fi Electronics", brand: "JBL", category: "Audio Visual Solutions", description: "Stereo Hi-Fi components for JBL loudspeakers.", featured: false, image: "" },
    { id: "prod-20", name: "JBL Floor-Standing Speakers", brand: "JBL", category: "Audio Visual Solutions", description: "Powerful sound and bold design.", featured: false, image: "" },
    { id: "prod-21", name: "EIKI EK-129X Laser Projector", brand: "EIKI", category: "Video Solutions", description: "5,000 Lumens XGA laser projector.", featured: false, image: "" },
    { id: "prod-22", name: "EIKI EK-130U Laser Projector", brand: "EIKI", category: "Video Solutions", description: "5,000 Lumens WUXGA laser projector.", featured: false, image: "" },
    { id: "prod-23", name: "EIKI EK-500LU Laser Projector", brand: "EIKI", category: "Video Solutions", description: "5,000 Lumens WUXGA laser projector.", featured: false, image: "" },
    { id: "prod-43", name: "Yealink Video Conference System", brand: "Yealink", category: "Video Conference System", description: "HD audio and video conferencing solution.", featured: true, image: "" },
    { id: "prod-79", name: "Solar Energy Solution", category: "Power Solutions", description: "Sustainable solar solutions.", featured: true, image: "" }
];

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('panaudio');
    
    await db.collection('products').deleteMany({});
    
    await db.collection('products').insertMany(productsData);
    
    res.json({ success: true, count: productsData.length });
  } catch (error) {
    console.error('Seed error:', error);
    res.status(500).json({ message: 'Seed failed', error: error.message });
  }
}
