const express = require('express');
const router = express.Router();
// const bodyParser = require('body-parser');
const Razorpay = require('razorpay');
const authorizeRoles = require('../../Middleware/authorizeRoles');
const Order = require('../../Schema/orderSchema');


// router.post('/',authorizeRoles("buyer","seller","admin"),  async (req, res) => {
 
// });

// Initialize Razorpay instance with your API keys
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

// Route to create a Razorpay order and save order in DB
router.post("/",authorizeRoles("buyer","seller","admin"), async (req, res) => {
  try {
    const {
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    // 1. Create Razorpay order
    const options = {
      amount: Math.round(totalPrice * 100), // Rs. to paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    };
    const razorpayOrder = await razorpay.orders.create(options);

    // 2. Create and save order in MongoDB
    const order = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      razorpayOrderId: razorpayOrder.id, // Save Razorpay orderId for future reference
      orderStatus: "Pending",
      isPaid: false,
    });

    const savedOrder = await order.save();

    // 3. Respond with both order details
    res.status(201).json({
      success: true,
      razorpayOrder: {
        id: razorpayOrder.id,
        amount: razorpayOrder.amount,
        currency: razorpayOrder.currency,
      },
      order: savedOrder,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: error.message,
    });
  }
});




module.exports = router;
