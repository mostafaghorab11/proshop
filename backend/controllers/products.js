import Product from '../models/product.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// @desc Get all products
// @route GET /api/products
// @access Public
export const getAllProducts = catchAsync(async (req, res) => {
  const products = await Product.find({});
  res.status(200).json(products);
});

// @desc Get product by id
// @route GET /api/products/:id
// @access Public
export const getProductById = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  res.status(200).json(product);
});

// @desc Create new product
// @route POST /api/products
// @access Private/Admin
export const createProduct = catchAsync(async (req, res) => {
  // make a sample product
  const product = await Product.create({
    name: 'sample name',
    price: 0,
    user: req.user._id,
    image: '/images/sample.jpg',
    brand: 'sample brand',
    category: 'sample category',
    countInStock: 0,
    numReviews: 0,
    description: 'sample description',
  });

  // const product = await Product.create(req.body);
  res.status(201).json(product);
});

// @desc Update product
// @route PUT /api/products/:id
// @access Private/Admin
export const updateProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true }
  );

  res.status(200).json(updatedProduct);
});

// @desc Delete product
// @route DELETE /api/products/:id
// @access Private/Admin
export const deleteProduct = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }
  await product.deleteOne();
  res.status(200).json({ message: 'Product deleted' });
});
