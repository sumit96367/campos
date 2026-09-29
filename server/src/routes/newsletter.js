import express from 'express';
import { subscribe, unsubscribe, getSubscribers } from '../controllers/newsletter.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.post('/subscribe', subscribe);
router.get('/unsubscribe/:token', unsubscribe);
router.get('/subscribers', protect, adminOnly, getSubscribers);

export default router;
