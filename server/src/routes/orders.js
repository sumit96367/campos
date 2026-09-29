import express from 'express';
import { createCheckoutSession, getOrders, getOrder, getOrderBySession, getAllOrders, updateOrderStatus } from '../controllers/orders.js';
import { protect, adminOnly, optionalAuth } from '../middleware/auth.js';

const router = express.Router();

router.post('/checkout', optionalAuth, createCheckoutSession);
router.get('/session/:sessionId', getOrderBySession);
router.get('/admin/all', protect, adminOnly, getAllOrders);
router.get('/', protect, getOrders);
router.get('/:id', protect, getOrder);
router.patch('/:id/status', protect, adminOnly, updateOrderStatus);

export default router;
