import Stripe from 'stripe';
import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';
import Product from '../models/productModel.js';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

// @desc    Create a Stripe payment intent
// @route   POST /api/payments/create-payment-intent
// @access  Private
const createPaymentIntent = asyncHandler(async (req, res) => {
  const { items } = req.body; // Expecting items = [{ id, quantity }]

  // --- SERVER-SIDE PRICE CALCULATION ---
  // 1. Create a map of product IDs to quantities
  const itemMap = new Map(items.map(i => [i.id, i.quantity]));
  const productIds = Array.from(itemMap.keys());

  // 2. Fetch products from the database
  const productsFromDB = await Product.find({ _id: { $in: productIds } });
  
  // 3. Calculate total amount securely
  let totalAmount = 0;
  for (const product of productsFromDB) {
    const quantity = itemMap.get(product._id.toString());
    if (quantity > 0) {
      totalAmount += product.price * quantity;
    }
  }

  // Stripe expects amount in the smallest currency unit (e.g., cents)
  const amountInCents = Math.round(totalAmount * 100);

  if (amountInCents <= 0) {
    res.status(400);
    throw new Error('Invalid order amount.');
  }

  const paymentIntent = await stripe.paymentIntents.create({
    amount: amountInCents,
    currency: 'inr', // change currency as needed
    automatic_payment_methods: {
      enabled: true,
    },
  });

  res.send({
    clientSecret: paymentIntent.client_secret,
  });
});

// @desc    Stripe webhook handler
// @route   POST /api/payments/stripe-webhook
// @access  Public (Webhook from Stripe)
const stripeWebhook = asyncHandler(async (req, res) => {
  const sig = req.headers['stripe-signature'];
  let event;

  try {
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error(`Webhook Error: ${err.message}`);
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }

  // Handle the event
  if (event.type === 'payment_intent.succeeded') {
    const paymentIntent = event.data.object;
    console.log('PaymentIntent was successful!', paymentIntent.id);
    
    // Find the order associated with this payment intent and update its status
    // This requires you to store the paymentIntentId on your Order model when it's created
    // For now, we log it. In a full app, you would:
    // const order = await Order.findOne({ paymentIntentId: paymentIntent.id });
    // if (order) {
    //   order.isPaid = true;
    //   order.paidAt = Date.now();
    //   order.paymentResult = { ... };
    //   await order.save();
    // }
  } else {
    console.warn(`Unhandled event type ${event.type}`);
  }

  res.status(200).json({ received: true });
});

export { createPaymentIntent, stripeWebhook };