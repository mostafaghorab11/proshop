import jwt from 'jsonwebtoken';
import User from '../models/user.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

const protect = catchAsync(async (req, res, next) => {
  let token;
  token = req.cookies.jwt;

  if (!token) {
    return next(new AppError('You are not logged in', 401));
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await User.findById(decoded.userId).select('-password');
    next();
  } catch (error) {
    return next(new AppError('You are not authorized, Token failed', 401));
  }
});

const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    next(new AppError('You are not authorized as an admin', 403));
  }
};

export { admin, protect };
