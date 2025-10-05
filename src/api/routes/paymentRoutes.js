import express from 'express';
import { createPaymentIntent, stripeWebhook } from '../controllers/paymentController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// NOTE: The webhook route uses express.raw({type: 'application/json'}) to get the raw body
// We handle this in the main index.js file for this specific route.
router.post('/stripe-webhook', express.raw({type: 'application/json'}), stripeWebhook);
router.post('/create-payment-intent', protect, createPaymentIntent);

export default router;