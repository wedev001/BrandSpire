import { Router } from 'express';
import {
  submitContact,
  listSubmissions,
  updateSubmissionById,
  deleteSubmissionById,
} from '../controllers/contact.controller.js';
import { requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

router.post('/', submitContact);
router.get('/submissions', requireAdmin, listSubmissions);
router.put('/submissions/:id', requireAdmin, updateSubmissionById);
router.delete('/submissions/:id', requireAdmin, deleteSubmissionById);

export default router;
