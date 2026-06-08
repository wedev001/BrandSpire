export function checkHealth(_req, res) {
  res.json({ ok: true, service: 'brandspire-backend', time: new Date().toISOString() });
}
