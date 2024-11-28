import express from 'express';
import {
  createProduct,
  createProductReview,
  deleteProduct,
  getAllProducts,
  getProductById,
  getTopProducts,
  updateProduct,
} from '../controllers/products.js';
import { admin, protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.route('/top').get(getTopProducts);

router.route('/').get(getAllProducts).post(protect, admin, createProduct);

router
  .route('/:id')
  .get(getProductById)
  .put(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);

router.route('/:id/reviews').post(protect, createProductReview);

export default router;
