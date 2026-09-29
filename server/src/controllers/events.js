import Event from '../models/Event.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';

// @desc    Get all upcoming events
// @route   GET /api/v1/events
export const getEvents = asyncHandler(async (req, res) => {
  const { category, upcoming, page = 1, limit = 12 } = req.query;
  const filter = { isActive: true };
  if (category) filter.category = category;
  if (upcoming === 'true') filter.date = { $gte: new Date() };

  const skip = (Number(page) - 1) * Number(limit);
  const total = await Event.countDocuments(filter);
  const events = await Event.find(filter).sort('date').skip(skip).limit(Number(limit));

  res.json({ success: true, count: events.length, total, events });
});

// @desc    Get single event by slug
// @route   GET /api/v1/events/:slug
export const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findOne({ slug: req.params.slug, isActive: true });
  if (!event) throw new AppError('Event not found', 404);
  res.json({ success: true, event });
});

// @desc    Admin: create event
// @route   POST /api/v1/events
export const createEvent = asyncHandler(async (req, res) => {
  const event = await Event.create(req.body);
  res.status(201).json({ success: true, event });
});

// @desc    Admin: update event
// @route   PUT /api/v1/events/:id
export const updateEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
  if (!event) throw new AppError('Event not found', 404);
  res.json({ success: true, event });
});

// @desc    Admin: delete event
// @route   DELETE /api/v1/events/:id
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findByIdAndUpdate(req.params.id, { isActive: false });
  if (!event) throw new AppError('Event not found', 404);
  res.json({ success: true, message: 'Event removed' });
});
