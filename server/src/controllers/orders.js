import Stripe from 'stripe';
import Order from '../models/Order.js';
import Product from '../models/Product.js';
import { asyncHandler, AppError } from '../middleware/errorHandler.js';
import { sendEmail } from '../utils/email.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create Stripe checkout session
// @route   POST /api/v1/orders/checkout
export const createCheckoutSession = asyncHandler(async (req, res) => {
  const { items, shippingAddress } = req.body;
  if (!items?.length) throw new AppError('No items in cart', 400);

  // Validate all products exist and are in stock
  const productIds = items.map((i) => i.product);
  const products = await Product.find({ _id: { $in: productIds } });

  const lineItems = items.map((item) => {
    const product = products.find((p) => p._id.toString() === item.product);
    if (!product) throw new AppError(`Product not found: ${item.product}`, 404);
    return {
      price_data: {
        currency: 'usd',
        product_data: {
          name: product.name,
          images: product.images?.[0]?.url ? [product.images[0].url] : [],
          description: product.shortDescription || product.description?.substring(0, 200),
        },
        unit_amount: Math.round(product.price * 100),
      },
      quantity: item.quantity,
    };
  });

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: lineItems,
    mode: 'payment',
    success_url: `${process.env.CLIENT_URL}/order-confirmation?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${process.env.CLIENT_URL}/cart`,
    shipping_address_collection: { allowed_countries: ['US'] },
    metadata: {
      userId: req.user?._id?.toString() || 'guest',
      shippingData: JSON.stringify(shippingAddress),
    },
  });

  res.json({ success: true, sessionId: session.id, url: session.url });
});

// @desc    Get user orders
// @route   GET /api/v1/orders
export const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user.id }).sort('-createdAt').populate('items.product', 'name images');
  res.json({ success: true, count: orders.length, orders });
});

// @desc    Get single order
// @route   GET /api/v1/orders/:id
export const getOrder = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate('items.product');
  if (!order) throw new AppError('Order not found', 404);
  if (order.user?.toString() !== req.user.id && req.user.role !== 'admin') {
    throw new AppError('Not authorized', 403);
  }
  res.json({ success: true, order });
});

// @desc    Get order by session ID (for confirmation page)
// @route   GET /api/v1/orders/session/:sessionId
export const getOrderBySession = asyncHandler(async (req, res) => {
  const order = await Order.findOne({ stripeSessionId: req.params.sessionId });
  if (!order) throw new AppError('Order not found', 404);
  res.json({ success: true, order });
});

// @desc    Admin: get all orders
// @route   GET /api/v1/orders/admin/all
export const getAllOrders = asyncHandler(async (req, res) => {
  const { status, page = 1, limit = 20 } = req.query;
  const filter = {};
  if (status) filter.status = status;
  const skip = (Number(page) - 1) * Number(limit);
  const total = await Order.countDocuments(filter);
  const orders = await Order.find(filter).sort('-createdAt').skip(skip).limit(Number(limit)).populate('user', 'firstName lastName email');
  res.json({ success: true, count: orders.length, total, orders });
});

// @desc    Admin: update order status
// @route   PATCH /api/v1/orders/:id/status
export const updateOrderStatus = asyncHandler(async (req, res) => {
  const order = await Order.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status, trackingNumber: req.body.trackingNumber },
    { new: true }
  );
  if (!order) throw new AppError('Order not found', 404);
  res.json({ success: true, order });
});
