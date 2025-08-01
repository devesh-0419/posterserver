const express = require('express');
const router = express.Router();
const Razorpay = require('razorpay');
const crypto = require("crypto");
const authorizeRoles = require('../../Middleware/authorizeRoles');
const Order = require('../../Schema/orderSchema');
const User = require('../../Schema/userSchema');

require('dotenv').config();

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_SECRET,
});

router.post("/", authorizeRoles("buyer", "seller", "admin"), async (req, res) => {
  try {
    console.log('req.body', req.body)
    const {
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
    } = req.body;

    const user = await User.findOne({ $or : [{ username: req.user.username }, { email: req.user.username }] });

    const razorpayOrder = await razorpay.orders.create({
      amount: Math.round(totalPrice * 100), // in paise
      currency: "INR",
      receipt: crypto.randomBytes(10).toString("hex"),
    });

    const newOrder = new Order({
      user,
      orderItems,
      shippingAddress,
      paymentMethod,
      totalPrice,
      razorpayOrderId: razorpayOrder.id,
      orderStatus: "Pending",
      isPaid: false,
    });

    const savedOrder = await newOrder.save();

    res.status(201).json({
      success: true,
      razorpayOrder,
      order: savedOrder,
    });
  } catch (err) {
    console.error("Create order error:", err.message);
    res.status(500).json({
      success: false,
      message: "Order creation failed",
      error: err.message,
    });
  }
});

module.exports = router;
