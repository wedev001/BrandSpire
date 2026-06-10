import { randomUUID } from 'node:crypto';
import { EMAIL_RE, ALLOWED_PROJECT_TYPES, ALLOWED_BUDGETS } from '../config/constants.js';
import {
  appendSubmission,
  readSubmissions,
  updateSubmission,
  deleteSubmission,
} from '../services/storage.service.js';
import { sendContactNotification } from '../services/mail.service.js';

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

    let emailSent = false;
    try {
      const mailResult = await sendContactNotification(entry);
      emailSent = mailResult.sent;
    } catch (mailErr) {
      console.error('[contact] email notification failed', mailErr);
    }

    return res.json({ ok: true, id: entry.id, emailSent });
  } catch (err) {
    console.error('[contact] error', err);
    return res.status(500).json({ ok: false, error: 'Server error. Try again shortly.' });
  }
}

export async function listSubmissions(req, res) {
  const list = await readSubmissions();
  res.json({ ok: true, count: list.length, submissions: list });
}

export async function updateSubmissionById(req, res) {
  const id = req.params.id;

  try {
    const allowed = ['name', 'email', 'phone', 'message', 'projectType', 'budget', 'userAgent', 'ip'];
    const updates = {};

    for (const key of allowed) {
      if (key in req.body) updates[key] = sanitize(req.body[key], 4000);
    }

    const submission = await updateSubmission(id, updates);
    if (!submission) {
      return res.status(404).json({ ok: false, error: 'Not found' });
    }

    return res.json({ ok: true, submission });
  } catch (err) {
    console.error('[submissions:update] error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}

export async function deleteSubmissionById(req, res) {
  const id = req.params.id;

  try {
    const deleted = await deleteSubmission(id);
    if (!deleted) {
      return res.status(404).json({ ok: false, error: 'Not found' });
    }

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('[submissions:delete] error', err);
    return res.status(500).json({ ok: false, error: 'Server error' });
  }
}
