import Booking from '../models/Booking.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { sendEmail } from '../utils/email.js';

const TASTING_TYPES = {
  standard: { name: 'Standard Tasting', price: 0, description: 'Classic tasting experience — 5 wines' },
  reserve: { name: 'Reserve Tasting', price: 25, description: 'Premium reserve wines selection' },
  private: { name: 'Private Tasting', price: 50, description: 'Private tasting for your group' },
  'food-pairing': { name: 'Food & Wine Pairing', price: 35, description: 'Curated food and wine pairings' },
};

const TIME_SLOTS = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const FRIDAY_SLOTS = ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'];
const MAX_CAPACITY_PER_SLOT = 10;

// @desc    Check availability for a date
// @route   GET /api/v1/bookings/availability
export const checkAvailability = asyncHandler(async (req, res) => {
  const { date } = req.query;
  if (!date) throw new AppError('Date is required', 400);

  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const bookings = await Booking.find({
    date: { $gte: startOfDay, $lte: endOfDay },
    status: { $nin: ['cancelled'] },
  });

  const dayOfWeek = new Date(date).getDay();
  const isOpen = dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0; // Fri, Sat, Sun

  const slots = TIME_SLOTS.map((slot) => {
    const booked = bookings.filter((b) => b.timeSlot === slot);
    const partySizeBooked = booked.reduce((sum, b) => sum + b.partySize, 0);
    return {
      time: slot,
      available: isOpen && partySizeBooked < MAX_CAPACITY_PER_SLOT,
      spotsLeft: Math.max(0, MAX_CAPACITY_PER_SLOT - partySizeBooked),
    };
  });

  res.json({ success: true, date, isOpen, slots, tastingTypes: TASTING_TYPES });
});

// @desc    Create booking
// @route   POST /api/v1/bookings
export const createBooking = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, phone, date, timeSlot, partySize, tastingType, specialRequests } = req.body;

  // Check slot availability
  const bookingDate = new Date(date);
  const startOfDay = new Date(date);
  startOfDay.setHours(0, 0, 0, 0);
  const endOfDay = new Date(date);
  endOfDay.setHours(23, 59, 59, 999);

  const existingBookings = await Booking.find({
    date: { $gte: startOfDay, $lte: endOfDay },
    timeSlot,
    status: { $nin: ['cancelled'] },
  });

  const totalBooked = existingBookings.reduce((sum, b) => sum + b.partySize, 0);
  if (totalBooked + Number(partySize) > MAX_CAPACITY_PER_SLOT) {
    throw new AppError('This time slot is no longer available. Please choose another time.', 409);
  }

  const tastingInfo = TASTING_TYPES[tastingType] || TASTING_TYPES.standard;
  const totalCost = tastingInfo.price * Number(partySize);

  const booking = await Booking.create({
    user: req.user?._id,
    firstName, lastName, email, phone,
    date: bookingDate,
    timeSlot, partySize: Number(partySize),
    tastingType: tastingType || 'standard',
    specialRequests,
    totalCost,
    status: 'confirmed',
  });

  // Send confirmation email
  sendEmail({
    to: email,
    subject: `Booking Confirmed — Campos Family Vineyards`,
    template: 'bookingConfirmation',
    data: { firstName, bookingNumber: booking.bookingNumber, date, timeSlot, partySize, tastingType: tastingInfo.name },
  }).catch(console.error);

  res.status(201).json({ success: true, booking });
});

// @desc    Cancel booking
// @route   PATCH /api/v1/bookings/:id/cancel
export const cancelBooking = asyncHandler(async (req, res) => {
  const booking = await Booking.findById(req.params.id);
  if (!booking) throw new AppError('Booking not found', 404);
  if (booking.user?.toString() !== req.user?.id && req.user?.role !== 'admin') {
    throw new AppError('Not authorized', 403);
  }
  if (booking.status === 'cancelled') throw new AppError('Booking already cancelled', 400);

  booking.status = 'cancelled';
  booking.cancellationReason = req.body.reason || 'Cancelled by customer';
  booking.cancelledAt = new Date();
  await booking.save();

  res.json({ success: true, message: 'Booking cancelled successfully', booking });
});

// @desc    Get user bookings
// @route   GET /api/v1/bookings/my
export const getMyBookings = asyncHandler(async (req, res) => {
  const bookings = await Booking.find({ user: req.user.id }).sort('-date');
  res.json({ success: true, count: bookings.length, bookings });
});

// @desc    Admin: get all bookings
// @route   GET /api/v1/bookings/admin/all
export const getAllBookings = asyncHandler(async (req, res) => {
  const { date, status } = req.query;
  const filter = {};
  if (status) filter.status = status;
  if (date) {
    const d = new Date(date);
    filter.date = { $gte: new Date(d.setHours(0, 0, 0, 0)), $lte: new Date(d.setHours(23, 59, 59, 999)) };
  }
  const bookings = await Booking.find(filter).sort('-date').populate('user', 'firstName lastName email');
  res.json({ success: true, count: bookings.length, bookings });
});
