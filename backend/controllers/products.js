import Product from '../models/product.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// @desc Get all products
// @route GET /api/products
// @access Public
export const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find({});
  res.json(products);
});

// @desc Get product by id
// @route GET /api/products/:id
// @access Public
export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.json(product);
});
