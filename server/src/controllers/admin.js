import User from '../models/User.js';
import Order from '../models/Order.js';
import Booking from '../models/Booking.js';
import Product from '../models/Product.js';
import Event from '../models/Event.js';
import ContactMessage from '../models/ContactMessage.js';
import Subscriber from '../models/Subscriber.js';
import ClubMember from '../models/ClubMember.js';
import { asyncHandler } from '../middleware/errorHandler.js';

// @desc    Admin: dashboard stats
// @route   GET /api/v1/admin/stats
export const getStats = asyncHandler(async (req, res) => {
  const [
    totalUsers, totalOrders, totalProducts, totalBookings,
    totalEvents, unreadMessages, activeSubscribers, clubMembers,
    recentOrders, recentBookings,
  ] = await Promise.all([
    User.countDocuments({ role: 'customer' }),
    Order.countDocuments(),
    Product.countDocuments({ isActive: true }),
    Booking.countDocuments({ status: { $nin: ['cancelled'] } }),
    Event.countDocuments({ isActive: true, date: { $gte: new Date() } }),
    ContactMessage.countDocuments({ isRead: false }),
    Subscriber.countDocuments({ status: 'active' }),
    ClubMember.countDocuments({ status: 'active' }),
    Order.find().sort('-createdAt').limit(5).populate('user', 'firstName lastName email'),
    Booking.find({ date: { $gte: new Date() } }).sort('date').limit(5),
  ]);

  // Revenue calculation
  const revenueData = await Order.aggregate([
    { $match: { paymentStatus: 'paid' } },
    { $group: { _id: null, total: { $sum: '$total' } } },
  ]);

  res.json({
    success: true,
    stats: {
      totalUsers, totalOrders, totalProducts, totalBookings,
      totalEvents, unreadMessages, activeSubscribers, clubMembers,
      totalRevenue: revenueData[0]?.total || 0,
    },
    recentOrders,
    recentBookings,
  });
});

// @desc    Admin: get all users
// @route   GET /api/v1/admin/users
export const getUsers = asyncHandler(async (req, res) => {
  const { role, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (role) filter.role = role;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await User.countDocuments(filter);
  const users = await User.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)).select('-password');
  res.json({ success: true, count: users.length, total, users });
});

// @desc    Admin: update user role
// @route   PATCH /api/v1/admin/users/:id/role
export const updateUserRole = asyncHandler(async (req, res) => {
  const user = await User.findByIdAndUpdate(req.params.id, { role: req.body.role }, { new: true }).select('-password');
  res.json({ success: true, user });
});
