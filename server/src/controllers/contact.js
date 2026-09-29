import ContactMessage from '../models/ContactMessage.js';
import Subscriber from '../models/Subscriber.js';
import Event from '../models/Event.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { sendEmail } from '../utils/email.js';

// @desc    Submit contact form
// @route   POST /api/v1/contact
export const submitContact = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, subject, message, inquiryType } = req.body;

  const contact = await ContactMessage.create({
    firstName, lastName, email, phone, subject, message,
    inquiryType: inquiryType || 'general',
    ipAddress: req.ip,
  });

  // Send notification to admin
  sendEmail({
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${subject || inquiryType}`,
    template: 'contactAdmin',
    data: { firstName, lastName, email, phone, message, inquiryType },
  }).catch(console.error);

  // Auto-reply to sender
  sendEmail({
    to: email,
    subject: 'We received your message — Campos Family Vineyards',
    template: 'contactAutoReply',
    data: { firstName },
  }).catch(console.error);

  res.status(201).json({ success: true, message: 'Your message has been received. We will be in touch soon!' });
});

// @desc    Admin: get all contact messages
// @route   GET /api/v1/contact
export const getMessages = asyncHandler(async (req, res) => {
  const { isRead, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (isRead !== undefined) filter.isRead = isRead === 'true';
  const skip = (Number(page) - 1) * Number(limit);
  const total = await ContactMessage.countDocuments(filter);
  const messages = await ContactMessage.find(filter).sort('-createdAt').skip(skip).limit(Number(limit));
  res.json({ success: true, count: messages.length, total, messages });
});

// @desc    Admin: mark message as read
// @route   PATCH /api/v1/contact/:id/read
export const markRead = asyncHandler(async (req, res) => {
  const message = await ContactMessage.findByIdAndUpdate(req.params.id, { isRead: true }, { new: true });
  if (!message) throw new AppError('Message not found', 404);
  res.json({ success: true, message });
});
