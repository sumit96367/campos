import express from 'express';
import { getStats, getUsers, updateUserRole } from '../controllers/admin.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

// All admin routes require auth + admin role
router.use(protect, adminOnly);

router.get('/stats', getStats);
router.get('/users', getUsers);
router.patch('/users/:id/role', updateUserRole);

export default router;
