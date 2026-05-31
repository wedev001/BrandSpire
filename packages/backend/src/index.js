import express from 'express';
import cors from 'cors';
import 'dotenv/config';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));

// Health check
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'brandspire-backend', time: new Date().toISOString() });
});

// Contact form endpoint — wire to a real mailer/DB later.
app.post('/api/contact', (req, res) => {
  const { name, email, phone, message } = req.body || {};
  if (!name || !email || !message) {
    return res.status(400).json({ ok: false, error: 'Missing required fields.' });
  }
  console.log('[contact]', { name, email, phone, message });
  // TODO: persist (DB) + notify (email / Slack / WhatsApp)
  res.json({ ok: true, received: true });
});

app.listen(PORT, () => {
  console.log(`BrandSpire backend listening on http://localhost:${PORT}`);
});
