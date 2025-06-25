// proxy-nominatim.js
import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Reverse geocoding endpoint
app.get('/api/reverse', async (req, res) => {
  const { lat, lon } = req.query;

  if (!lat || !lon) {
    return res.status(400).json({ error: 'Missing lat or lon query params' });
  }

  try {
    const nominatimRes = await fetch(`http://localhost:7070/reverse?format=json&lat=${lat}&lon=${lon}`);
    const data = await nominatimRes.json();
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(3002, () => {
  console.log('🛰 Nominatim proxy running on http://localhost:3002');
});
