import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import { initStorage } from './services/storage.service.js';

import healthRoutes from './routes/health.routes.js';
import contactRoutes from './routes/contact.routes.js';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));

// ---------- Routes ----------
app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);

// Update a submission (admin)
app.put('/api/contact/submissions/:id', async (req, res) => {
  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_TOKEN && token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: 'Unauthorized.' });
  }

  const id = req.params.id;
  try {
    const list = await readSubmissions();
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) return res.status(404).json({ ok: false, error: 'Not found' });

    const allowed = ['name', 'email', 'phone', 'message', 'projectType', 'budget', 'userAgent', 'ip'];
    for (const key of allowed) {
      if (key in req.body) list[idx][key] = sanitize(req.body[key], 4000);
    }

    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
    return res.json({ ok: true, submission: list[idx] });
  } catch (err) {
    console.error('[submissions:update] error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// Delete a submission (admin)
app.delete('/api/contact/submissions/:id', async (req, res) => {
  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_TOKEN && token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: 'Unauthorized.' });
  }

  const id = req.params.id;
  try {
    const list = await readSubmissions();
    const idx = list.findIndex((s) => s.id === id);
    if (idx === -1) return res.status(404).json({ ok: false, error: 'Not found' });

    list.splice(idx, 1);
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[submissions:delete] error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
});

// ---------- Boot ----------
await initStorage();
app.listen(PORT, () => {
  console.log(`BrandSpire backend listening on http://localhost:${PORT}`);
});
