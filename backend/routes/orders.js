import express from 'express';
import {
  addOrderItems,
  getAllOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
} from '../controllers/order.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/:id/pay').put(protect, updateOrderToPaid);

router.route('/myorders').get(protect, getOrders);

router.route('/:id/deliver').put(protect, updateOrderToDelivered);

router.route('/:id').get(protect, getOrderById);

router
  .route('/')
  .get(protect, admin, getAllOrders)
  .post(protect, addOrderItems);

export default router;
