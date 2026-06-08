import 'dotenv/config';

export function requireAdmin(req, res, next) {
  const token = req.headers['x-admin-token'];
  if (process.env.ADMIN_TOKEN && token !== process.env.ADMIN_TOKEN) {
    return res.status(401).json({ ok: false, error: 'Unauthorized.' });
  }
  next();
}
