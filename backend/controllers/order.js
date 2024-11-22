import Order from '../models/order.js';
import AppError from '../utils/appError.js';

// @desc add new order
// @route POST /api/orders
// @access Private
const addOrderItems = async (req, res, next) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body;

  if (orderItems && orderItems.length === 0) {
    next(new AppError('No order items', 400));
  } else {
    const order = new Order({
      orderItems: orderItems.map((orderItem) => ({
        ...orderItem,
        product: orderItem._id,
        _id: undefined,
      })),
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice,
    });

    const createdOrder = await order.save();
    res.status(201).json(createdOrder);
  }
};

// @desc Get my orders
// @route GET /api/orders/myorders
// @access Private
const getOrders = async (req, res) => {
  const orders = await Order.find({ user: req.user._id });
  res.status(200).json(orders);
};

// @desc get order by id
// @route GET /api/orders/:id
// @access Private
const getOrderById = async (req, res, next) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  );
  if (order) {
    res.status(200).json(order);
  } else {
    next(new AppError('Order not found', 404));
  }
};

// @desc update order to paid
// @route PUT /api/orders/:id/pay
// @access Private
const updateOrderToPaid = async (req, res, next) => {
  const { id, status, update_time, payer: { email_address } } = req.body;
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isPaid = true;
    order.paidAt = Date.now();
    order.paymentResult = {
      id,
      status,
      update_time,
      email_address,
    };
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    next(new AppError('Order not found', 404));
  }
};

// @desc update order to delivered
// @route PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderToDelivered = async (req, res, next) => {
  const order = await Order.findById(req.params.id);
  if (order) {
    order.isDelivered = true;
    order.deliveredAt = Date.now();
    const updatedOrder = await order.save();
    res.status(200).json(updatedOrder);
  } else {
    next(new AppError('Order not found', 404));
  }
};

//@desc Get all orders
//@route GET /api/orders
//@access Private/Admin
const getAllOrders = async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name');
  res.status(200).json(orders);
};

export {
  addOrderItems,
  getAllOrders,
  getOrderById,
  getOrders,
  updateOrderToDelivered,
  updateOrderToPaid,
};
