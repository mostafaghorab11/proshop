import User from '../models/user.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';
import generateToken from '../utils/generateToken.js';

// @desc Register user
// @route POST /api/users
// @access Public
const registerUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError('Please enter name, email and password', 400));
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(new AppError('User already exists', 400));
  }
  const user = await User.create({ name, email, password });
  if (!user) {
    return next(new AppError('User could not be created', 400));
  }

  generateToken(user._id, res);
  res.status(201).json({ user });
});

// @desc Login user
// @route POST /api/users/login
// @access Public
const login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return next(new AppError('Please enter email and password', 400));
  }
  const user = await User.findOne({ email }).select('+password');
  if (user) {
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return next(new AppError('Invalid email or password', 401));
    }
  }

  generateToken(user._id, res);

  res.status(200).json({ user });
});

// @desc Logout user
// @route POST /api/users/logout
// @access Private
const logout = catchAsync(async (req, res) => {
  res.cookie('jwt', '', {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({ success: true });
});

// @desc Get user profile
// @route GET /api/users/profile
// @access Private
const getUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id).select('-password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  res.status(200).json({ user });
});

// @desc Update user profile
// @route PUT /api/users/profile
// @access Private
const updateUserProfile = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.user._id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  if (req.body.password) {
    user.password = req.body.password;
  }

  const updatedUser = await user.save();
  res.status(200).json({ user: updatedUser });
});

// @desc Get all users
// @route GET /api/users
// @access Private/Admin
const getAllUsers = catchAsync(async (req, res) => {
  const users = await User.find();
  res.status(200).json(users);
});

// @desc Get user by id
// @route GET /api/users/:id
// @access Private/Admin
const getUserById = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  res.status(200).json(user);
});

// @desc Update user profile
// @route PUT /api/users/:id
// @access Private/Admin
const updateUser = catchAsync(async (req, res, next) => {
  const { name, email, isAdmin } = req.body;
  const user = await User.findById(req.params.id).select('-password');
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  const updatedUser = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, isAdmin },
    { new: true }
  );
  res.status(200).json(updatedUser);
});

// @desc Delete user
// @route DELETE /api/users/:id
// @access Private/Admin
const deleteUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  if(user.isAdmin) {
    return next(new AppError('Cannot delete admin user', 400));
  }
  await user.deleteOne();
  res.status(200).json({ success: true });
});

export {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  login,
  logout,
  registerUser,
  updateUser,
  updateUserProfile,
};
