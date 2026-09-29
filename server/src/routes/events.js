import express from 'express';
import { getEvents, getEvent, createEvent, updateEvent, deleteEvent } from '../controllers/events.js';
import { protect, adminOnly } from '../middleware/auth.js';

const router = express.Router();

router.get('/', getEvents);
router.get('/:slug', getEvent);
router.post('/', protect, adminOnly, createEvent);
router.put('/:id', protect, adminOnly, updateEvent);
router.delete('/:id', protect, adminOnly, deleteEvent);

export default router;
