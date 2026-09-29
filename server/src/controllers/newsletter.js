import Subscriber from '../models/Subscriber.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import crypto from 'crypto';

// @desc    Subscribe to newsletter
// @route   POST /api/v1/newsletter/subscribe
export const subscribe = asyncHandler(async (req, res) => {
  const { email, firstName, source } = req.body;
  if (!email) throw new AppError('Email is required', 400);

  const existing = await Subscriber.findOne({ email });
  if (existing) {
    if (existing.status === 'unsubscribed') {
      existing.status = 'active';
      existing.unsubscribedAt = undefined;
      await existing.save();
      return res.json({ success: true, message: 'Welcome back! You have been resubscribed.' });
    }
    return res.json({ success: true, message: 'You are already subscribed!' });
  }

  const unsubscribeToken = crypto.randomBytes(32).toString('hex');
  await Subscriber.create({ email, firstName, source: source || 'footer', unsubscribeToken });

  res.status(201).json({ success: true, message: 'Thank you for subscribing to our newsletter!' });
});

// @desc    Unsubscribe by token
// @route   GET /api/v1/newsletter/unsubscribe/:token
export const unsubscribe = asyncHandler(async (req, res) => {
  const subscriber = await Subscriber.findOne({ unsubscribeToken: req.params.token });
  if (!subscriber) throw new AppError('Invalid unsubscribe link', 404);

  subscriber.status = 'unsubscribed';
  subscriber.unsubscribedAt = new Date();
  await subscriber.save();

  res.json({ success: true, message: 'You have been unsubscribed successfully.' });
});

// @desc    Admin: get all subscribers
// @route   GET /api/v1/newsletter/subscribers
export const getSubscribers = asyncHandler(async (req, res) => {
  const { status = 'active', page = 1, limit = 50 } = req.query;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Subscriber.countDocuments({ status });
  const subscribers = await Subscriber.find({ status }).sort('-createdAt').skip(skip).limit(Number(limit));
  res.json({ success: true, count: subscribers.length, total, subscribers });
});
