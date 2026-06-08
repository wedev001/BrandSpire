import { randomUUID } from 'node:crypto';
import { EMAIL_RE, ALLOWED_PROJECT_TYPES, ALLOWED_BUDGETS } from '../config/constants.js';
import { appendSubmission, readSubmissions } from '../services/storage.service.js';
import { sendLeadEmail } from '../services/mail.service.js';

function sanitize(value, maxLen = 2000) {
  if (typeof value !== 'string') return '';
  return value.trim().slice(0, maxLen);
}

export async function submitContact(req, res) {
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

    // Send email notification
    await sendLeadEmail(entry);

    return res.json({ ok: true, id: entry.id });
  } catch (err) {
    console.error('[contact] error', err);
    return res.status(500).json({ ok: false, error: 'Server error. Try again shortly.' });
  }
}

export async function listSubmissions(req, res) {
  const list = await readSubmissions();
  res.json({ ok: true, count: list.length, submissions: list });
}
