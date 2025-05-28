const express = require('express');
const router = express.Router();
const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const authorizeRoles = require('../../Middleware/authorizeRoles');

// Initialize Razorpay client with your API key and secret
const razorpay = new Razorpay({
  key_id: 'rzp_test_OkvMNDsm80Hz4R',
  key_secret: 'vfBCpDsQ8kKx0PtmEBq6MazZ',
});

// Middleware to parse JSON bodies
router.use(bodyParser.json());

// Route to create a new payment order
router.post('/',authorizeRoles("seller","admin"),  async (req, res) => {
  try {
    const { amount, currency } = req.body;
    
    // Create a new order with Razorpay
    const order = await razorpay.orders.create({
      amount: amount, // Amount in paise
      currency: currency,
      payment_capture: 1, // Auto capture payments
    });
console.log('order', order);
    res.json({ order });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Route to handle payment success/failure webhook
router.post('/payment-callback', (req, res) => {
  const { body } = req;
  const { event, payload } = body;

  // Verify the webhook event and signature

  // Process the payment event (update database, send emails, etc.)

  res.status(200).send('Webhook received');
});

module.exports = router;
