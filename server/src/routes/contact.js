import express from 'express';
import { submitContact, getMessages, markRead } from '../controllers/contact.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/', submitContact);
router.get('/', protect, adminOnly, getMessages);
router.patch('/:id/read', protect, adminOnly, markRead);

export default router;
