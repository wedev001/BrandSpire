import { Router } from 'express';
import { submitContact, listSubmissions } from '../controllers/contact.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', submitContact);
router.get('/submissions', requireAdmin, listSubmissions);

export default router;
