import Product from '../models/product.js';
import AppError from '../utils/appError.js';
import catchAsync from '../utils/catchAsync.js';

// @desc Get all products
// @route GET /api/products
// @access Public
export const getAllProducts = catchAsync(async (req, res) => {
  const limit = req.query.limit;
  const page = Number(req.query.page) || 1;

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {};

  const count = await Product.countDocuments({ ...keyword });

  const products = await Product.find({ ...keyword })
    .limit(limit)
    .skip(limit * page - limit);

  res.status(200).json({ products, page, pages: Math.ceil(count / limit) });
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

// @desc Post make a review
// @route POST /api/products/:id/reviews
// @access Private
export const createProductReview = catchAsync(async (req, res, next) => {
  const product = await Product.findById(req.params.id);
  if (!product) {
    return next(new AppError('Product not found', 404));
  }

  const { rating, comment } = req.body;

  const alreadyReviewed = product.reviews.find(
    (r) => r.user.toString() === req.user._id.toString()
  );

  if (alreadyReviewed) {
    return next(new AppError('Product already reviewed', 400));
  }

  const review = {
    name: req.user.name,
    rating: Number(rating),
    comment,
    user: req.user._id,
  };

  product.reviews.push(review);
  product.numReviews = product.reviews.length;
  product.rating =
    product.reviews.reduce((acc, item) => item.rating + acc, 0) /
    product.reviews.length;

  await product.save();

  res.status(201).json({ message: 'Review added' });
});

// @desc Get top rated products
// @route GET /api/products/top
// @access Public
export const getTopProducts = catchAsync(async (req, res) => {
  const products = await Product.find({}).sort({ rating: -1 }).limit(3);
  res.status(200).json(products);
});
