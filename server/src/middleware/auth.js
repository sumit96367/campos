import jwt from 'jsonwebtoken';
import User from '../models/User.js';
import { asyncHandler, AppError } from './errorHandler.js';

/**
 * Protect routes — requires valid JWT in httpOnly cookie or Authorization header.
 */
export const protect = asyncHandler(async (req, res, next) => {
  let token;

  // Check cookie first
  if (req.cookies?.accessToken) {
    token = req.cookies.accessToken;
  } else if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) {
    throw new AppError('Not authorized — no token provided', 401);
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = await User.findById(decoded.id);

  if (!req.user) {
    throw new AppError('User not found', 401);
  }

  next();
});

/**
 * Admin-only route guard.
 */
export const adminOnly = (req, res, next) => {
  if (req.user?.role !== 'admin') {
    throw new AppError('Not authorized — admin access required', 403);
  }
  next();
};

/**
 * Optional auth — attaches user if token present, doesn't fail if absent.
 */
export const optionalAuth = asyncHandler(async (req, res, next) => {
  let token = req.cookies?.accessToken || (req.headers.authorization?.startsWith('Bearer ') ? req.headers.authorization.split(' ')[1] : null);
  if (token) {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.id);
    } catch {
      req.user = null;
    }
  }
  next();
});

/**
 * Generate tokens and set httpOnly cookie.
 */
export const sendTokenResponse = (user, statusCode, res) => {
  const accessToken = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '15m',
  });

  const refreshToken = jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, {
    expiresIn: process.env.JWT_REFRESH_EXPIRE || '7d',
  });

  const cookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'strict' : 'lax',
  };

  res
    .cookie('accessToken', accessToken, { ...cookieOptions, maxAge: 15 * 60 * 1000 })
    .cookie('refreshToken', refreshToken, { ...cookieOptions, maxAge: 7 * 24 * 60 * 60 * 1000 })
    .status(statusCode)
    .json({
      success: true,
      user: {
        _id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        role: user.role,
        wineClubMember: user.wineClubMember,
        wineClubTier: user.wineClubTier,
      },
    });
};
