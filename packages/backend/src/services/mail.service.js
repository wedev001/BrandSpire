import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import nodemailer from 'nodemailer';
import sharp from 'sharp';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const LOGO_CID = 'brandspire-logo';

const LOGO_CANDIDATES = [
  path.resolve(__dirname, '../assets/brandspire-logo.svg'),
  path.resolve(__dirname, '../../../frontend/public/brandspire-logo.svg'),
  path.resolve(__dirname, '../../../frontend/src/assets/logo.svg'),
];

let cachedLogoAttachment = null;
let logoLoadAttempted = false;

function isMailConfigured() {
  return Boolean(process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS);
}

function createTransporter() {
  const port = Number(process.env.SMTP_PORT || 587);
  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure: process.env.SMTP_SECURE === 'true' || port === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });
}

async function resolveLogoPath() {
  if (process.env.MAIL_LOGO_PATH) {
    try {
      await fs.access(process.env.MAIL_LOGO_PATH);
      return process.env.MAIL_LOGO_PATH;
    } catch {
      console.warn('[mail] MAIL_LOGO_PATH not found:', process.env.MAIL_LOGO_PATH);
    }
  }

  for (const candidate of LOGO_CANDIDATES) {
    try {
      await fs.access(candidate);
      return candidate;
    } catch {
      // try next
    }
  }

  return null;
}

async function getLogoAttachment() {
  if (logoLoadAttempted) return cachedLogoAttachment;
  logoLoadAttempted = true;

  try {
    const logoPath = await resolveLogoPath();
    if (!logoPath) {
      console.warn('[mail] logo file not found ΓÇö email will use text header.');
      return null;
    }

    const svgBuffer = await fs.readFile(logoPath);
    const pngBuffer = await sharp(svgBuffer)
      .resize(220, null, { withoutEnlargement: true })
      .png()
      .toBuffer();

    cachedLogoAttachment = {
      filename: 'brandspire-logo.png',
      content: pngBuffer,
      cid: LOGO_CID,
    };

    return cachedLogoAttachment;
  } catch (err) {
    console.warn('[mail] could not prepare logo for email:', err.message);
    return null;
  }
}

function escapeHtml(value) {
  return String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatReceivedAt(iso) {
  try {
    return new Intl.DateTimeFormat('en-IN', {
      dateStyle: 'medium',
      timeStyle: 'short',
      timeZone: 'Asia/Kolkata',
    }).format(new Date(iso));
  } catch {
    return iso;
  }
}

function buildSummaryLine({ name, projectType, budget }) {
  const type = projectType || 'a digital project';
  const range = budget ? ` with a budget of ${budget}` : '';
  return `${name} is interested in ${type}${range} and is waiting for your response.`;
}

function buildEmailHeaderHtml(hasLogo) {
  if (hasLogo) {
    return `
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-bottom:22px;padding-bottom:20px;border-bottom:1px solid #f1f5f9;">
            <tr>
              <td>
                <img src="cid:${LOGO_CID}" alt="BrandSpire" width="168" style="display:block;height:auto;border:0;outline:none;" />
                <p style="margin:8px 0 0;font-size:10px;letter-spacing:0.22em;text-transform:uppercase;color:#94a3b8;">Tech ┬╖ Innovate ┬╖ Inspire</p>
              </td>
            </tr>
          </table>`;
  }

  return `
          <p style="margin:0 0 6px;font-size:11px;letter-spacing:0.16em;text-transform:uppercase;color:#7c3aed;font-weight:600;">BrandSpire</p>`;
}

function buildContactEmailText(submission) {
  const { name, email, phone, projectType, budget, message, receivedAt, id } = submission;
  const received = formatReceivedAt(receivedAt);

  return [
    'BrandSpire ΓÇö New Contact Form Lead',
    '',
    buildSummaryLine(submission),
    '',
    'Client details',
    `Name         ${name}`,
    `Email        ${email}`,
    `Phone        ${phone || 'Not provided'}`,
    `Project      ${projectType || 'Not specified'}`,
    `Budget       ${budget || 'Not specified'}`,
    '',
    'What they want to build',
    message,
    '',
    'Suggested next step',
    'Reply to this email within 4 business hours with a quote, timeline, and a short discovery call link.',
    '',
    `Received ${received} (IST)`,
    `Reference ${id}`,
  ].join('\n');
}

function fieldRow(label, valueHtml) {
  return `
    <tr>
      <td style="padding:12px 0;border-bottom:1px solid #f1f5f9;color:#94a3b8;font-size:12px;font-weight:500;width:108px;vertical-align:top;">${escapeHtml(label)}</td>
      <td style="padding:12px 0 12px 16px;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:14px;line-height:1.5;vertical-align:top;">${valueHtml}</td>
    </tr>`;
}

function buildContactEmailHtml(submission, hasLogo = false) {
  const { name, email, phone, projectType, budget, message, receivedAt, id } = submission;
  const received = formatReceivedAt(receivedAt);
  const summary = buildSummaryLine(submission);
  const phoneDisplay = phone?.trim() || 'Not provided';
  const phoneHtml = phone?.trim()
    ? `<a href="tel:${escapeHtml(phone.trim())}" style="color:#2563eb;text-decoration:none;">${escapeHtml(phoneDisplay)}</a>`
    : escapeHtml(phoneDisplay);

  const rows = [
    fieldRow('Name', `<strong style="font-weight:600;">${escapeHtml(name)}</strong>`),
    fieldRow('Email', `<a href="mailto:${escapeHtml(email)}" style="color:#2563eb;text-decoration:none;">${escapeHtml(email)}</a>`),
    fieldRow('Phone', phoneHtml),
    fieldRow('Project', escapeHtml(projectType || 'Not specified')),
    fieldRow('Budget', escapeHtml(budget || 'Not specified')),
  ].join('');

  return `<!DOCTYPE html>
<html lang="en">
  <body style="margin:0;padding:32px 16px;background:#f8fafc;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Arial,sans-serif;color:#0f172a;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:520px;margin:0 auto;">
      <tr>
        <td style="background:#ffffff;padding:28px 28px 24px;border:1px solid #e2e8f0;border-radius:14px;">
          ${buildEmailHeaderHtml(hasLogo)}
          <h1 style="margin:0;font-size:20px;font-weight:600;line-height:1.35;color:#0f172a;">New lead from your website</h1>
          <p style="margin:14px 0 0;font-size:14px;line-height:1.65;color:#475569;">${escapeHtml(summary)}</p>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:24px;">
            ${rows}
          </table>

          <p style="margin:24px 0 8px;font-size:11px;letter-spacing:0.14em;text-transform:uppercase;color:#94a3b8;font-weight:600;">What they want to build</p>
          <p style="margin:0;padding:16px;background:#f8fafc;border-radius:10px;border:1px solid #f1f5f9;white-space:pre-wrap;font-size:14px;line-height:1.7;color:#334155;">${escapeHtml(message)}</p>

          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="margin-top:20px;background:#faf5ff;border:1px solid #ede9fe;border-radius:10px;">
            <tr>
              <td style="padding:14px 16px;">
                <p style="margin:0 0 4px;font-size:11px;letter-spacing:0.12em;text-transform:uppercase;color:#7c3aed;font-weight:600;">Next step</p>
                <p style="margin:0;font-size:13px;line-height:1.6;color:#5b21b6;">Reply within 4 business hours with a quote, timeline, and a short discovery call option. Hit <strong>Reply</strong> to reach ${escapeHtml(name)} directly.</p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
      <tr>
        <td style="padding:16px 4px 0;text-align:center;">
          <p style="margin:0;font-size:11px;line-height:1.6;color:#94a3b8;">
            Received ${escapeHtml(received)} IST ┬╖ Ref ${escapeHtml(id.slice(0, 8))}
          </p>
        </td>
      </tr>
    </table>
  </body>
</html>`;
}

export async function sendContactNotification(submission) {
  if (!isMailConfigured()) {
    console.warn('[mail] SMTP not configured ΓÇö skipping Gmail notification.');
    return { sent: false, reason: 'not_configured' };
  }

  const to = process.env.MAIL_TO || process.env.SMTP_USER;
  const from = process.env.MAIL_FROM || `"BrandSpire Website" <${process.env.SMTP_USER}>`;
  const logoAttachment = await getLogoAttachment();
  const attachments = logoAttachment ? [logoAttachment] : [];

  const transporter = createTransporter();
  const subject = `New lead: ${submission.name} ┬╖ ${submission.projectType || 'Project'}`;

  const info = await transporter.sendMail({
    from,
    to,
    replyTo: submission.email,
    subject,
    text: buildContactEmailText(submission),
    html: buildContactEmailHtml(submission, Boolean(logoAttachment)),
    attachments,
  });

  console.log('[mail] contact notification sent', {
    id: submission.id,
    messageId: info.messageId,
    logoAttached: Boolean(logoAttachment),
  });

  return { sent: true, messageId: info.messageId };
}
