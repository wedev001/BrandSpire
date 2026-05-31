import express from 'express';
import cors from 'cors';
import 'dotenv/config';
import fs from 'node:fs/promises';
import path from 'node:path';
import { randomUUID } from 'node:crypto';
import { fileURLToPath } from 'node:url';

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors({ origin: process.env.CORS_ORIGIN || '*' }));
app.use(express.json({ limit: '1mb' }));

// ---------- Storage init ----------
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DATA_DIR = path.resolve(__dirname, '..', 'data');
const SUBMISSIONS_FILE = path.join(DATA_DIR, 'submissions.json');

async function initStorage() {
  await fs.mkdir(DATA_DIR, { recursive: true });
  try {
    await fs.access(SUBMISSIONS_FILE);
  } catch {
    await fs.writeFile(SUBMISSIONS_FILE, '[]', 'utf8');
    console.log('[init] created', SUBMISSIONS_FILE);
  }
}

async function readSubmissions() {
  try {
    const raw = await fs.readFile(SUBMISSIONS_FILE, 'utf8');
    return JSON.parse(raw);
  } catch {
    return [];
  }
}

async function appendSubmission(entry) {
  const list = await readSubmissions();
  list.push(entry);
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(list, null, 2), 'utf8');
}

// ---------- Helpers ----------
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const ALLOWED_PROJECT_TYPES = new Set(['Website', 'Web App', 'E-Commerce', 'Dashboard', 'SaaS', 'Other']);
const ALLOWED_BUDGETS = new Set(['Under ₹25K', '₹25K – ₹75K', '₹75K – ₹2L', '₹2L+']);

function sanitize(value, maxLen = 2000) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

// ---------- Routes ----------
app.get('/api/health', (_req, res) => {
  res.json({ ok: true, service: 'brandspire-backend', time: new Date().toISOString() });
});

app.post('/api/contact', async (req, res) => {
  try {
    const name        = sanitize(req.body?.name, 120);
    const email       = sanitize(req.body?.email, 200).toLowerCase();
    const phone       = sanitize(req.body?.phone, 40);
    const message     = sanitize(req.body?.message, 4000);
    const projectType = sanitize(req.body?.projectType, 60);
    const budget      = sanitize(req.body?.budget, 60);

    const errors = {};
    if (!name)    errors.name = 'Name is required.';
    if (!email)   errors.email = 'Email is required.';
    else if (!EMAIL_RE.test(email)) errors.email = 'Email is not valid.';
    if (!message) errors.message = 'Message is required.';
    if (projectType && !ALLOWED_PROJECT_TYPES.has(projectType)) errors.projectType = 'Invalid project type.';
    if (budget && !ALLOWED_BUDGETS.has(budget)) errors.budget = 'Invalid budget.';

    if (Object.keys(errors).length) {
      return res.status(400).json({ ok: false, error: 'Validation failed.', errors });
    }

    const entry = {
      id: randomUUID(),
      name, email, phone, message,
      projectType: projectType || null,
      budget:      budget || null,
      receivedAt: new Date().toISOString(),
      userAgent: req.headers['user-agent'] || null,
      ip: req.ip || null,
    };

    await appendSubmission(entry);
    console.log('[contact]', { id: entry.id, name, email, projectType, budget });

    // TODO: notify via email / Slack / WhatsApp
    return res.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error('[contact] error', err);
    return res.status(500).json({ ok: false, error: 'Server error. Try again shortly.' });
  }
});

// Admin convenience — list submissions (gate behind a token in production!)
app.get('/api/contact/submissions', async (req, res) => {
  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_TOKEN && token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: 'Unauthorized.' });
  }
  const list = await readSubmissions();
  res.json({ ok: true, count: list.length, submissions: list });
});

// ---------- Boot ----------
await initStorage();
app.listen(PORT, () => {
  console.log(`BrandSpire backend listening on http://localhost:${PORT}`);
});
