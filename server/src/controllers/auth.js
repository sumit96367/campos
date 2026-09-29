import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import User from '../models/User.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { sendTokenResponse } from '../middleware/auth.js';
import { sendEmail } from '../utils/email.js';

// @desc    Register user
// @route   POST /api/v1/auth/register
export const register = asyncHandler(async (req, res) => {
  const { firstName, lastName, email, password, phone, ageVerified } = req.body;

  if (!ageVerified) throw new AppError('You must be 21 or older to register', 400);

  const existingUser = await User.findOne({ email });
  if (existingUser) throw new AppError('Email already registered', 400);

  const user = await User.create({ firstName, lastName, email, password, phone, ageVerified });

  // Send welcome email (non-blocking)
  sendEmail({
    to: email,
    subject: 'Welcome to Campos Family Vineyards',
    template: 'welcome',
    data: { firstName },
  }).catch(console.error);

  sendTokenResponse(user, 201, res);
});

// @desc    Login user
// @route   POST /api/v1/auth/login
export const login = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError('Email and password are required', 400);

  const user = await User.findOne({ email }).select('+password');
  if (!user || !(await user.matchPassword(password))) {
    throw new AppError('Invalid email or password', 401);
  }

  sendTokenResponse(user, 200, res);
});

// @desc    Logout user
// @route   POST /api/v1/auth/logout
export const logout = asyncHandler(async (req, res) => {
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .json({ success: true, message: 'Logged out successfully' });
});

// @desc    Refresh access token
// @route   POST /api/v1/auth/refresh
export const refresh = asyncHandler(async (req, res) => {
  const { refreshToken } = req.cookies;
  if (!refreshToken) throw new AppError('No refresh token', 401);

  const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError('User not found', 401);

  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '15m',
  });

  res
    .cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
      maxAge: 15 * 60 * 1000,
    })
    .json({ success: true });
});

// @desc    Get current user
// @route   GET /api/v1/auth/me
export const getMe = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user.id);
  res.json({ success: true, user });
});

// @desc    Update profile
// @route   PUT /api/v1/auth/me
export const updateProfile = asyncHandler(async (req, res) => {
  const { firstName, lastName, phone, address } = req.body;
  const user = await User.findByIdAndUpdate(
    req.user.id,
    { firstName, lastName, phone, address },
    { new: true, runValidators: true }
  );
  res.json({ success: true, user });
});

// @desc    Forgot password
// @route   POST /api/v1/auth/forgot-password
export const forgotPassword = asyncHandler(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    // Return success even if user not found (security)
    return res.json({ success: true, message: 'If that email exists, a reset link has been sent.' });
  }

  const token = crypto.randomBytes(32).toString('hex');
  user.resetPasswordToken = crypto.createHash('sha256').update(token).digest('hex');
  user.resetPasswordExpire = Date.now() + 60 * 60 * 1000; // 1 hour
  await user.save({ validateBeforeSave: false });

  const resetUrl = `${process.env.CLIENT_URL}/reset-password/${token}`;
  await sendEmail({
    to: user.email,
    subject: 'Password Reset — Campos Family Vineyards',
    template: 'resetPassword',
    data: { firstName: user.firstName, resetUrl },
  });

  res.json({ success: true, message: 'Reset link sent to your email.' });
});

// @desc    Reset password
// @route   POST /api/v1/auth/reset-password/:token
export const resetPassword = asyncHandler(async (req, res) => {
  const hashedToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
  const user = await User.findOne({
    resetPasswordToken: hashedToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) throw new AppError('Invalid or expired reset token', 400);

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendTokenResponse(user, 200, res);
});
