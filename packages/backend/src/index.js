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

app.use('/api/health', healthRoutes);
app.use('/api/contact', contactRoutes);

await initStorage();
app.listen(PORT, () => {
  console.log(`BrandSpire backend listening on http://localhost:${PORT}`);
});
