import express from 'express';
import {
  deleteUser,
  getAllUsers,
  getUserById,
  getUserProfile,
  login,
  logout,
  registerUser,
  updateUser,
  updateUserProfile,
} from '../controllers/userController.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/login').post(login);

router.route('/logout').post(protect, logout);

router
  .route('/profile')
  .get(protect, getUserProfile)
  .put(protect, updateUserProfile);

router.route('/').get(protect, admin, getAllUsers).post(registerUser);

router
  .route('/:id')
  .get(protect, admin, getUserById)
  .put(protect, admin, updateUser)
  .delete(protect, admin, deleteUser);

export default router;
