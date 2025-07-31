const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    orderItems: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Poster",
          required: true,
        },
        name: String,
        quantity: {
          type: Number,
          required: true, 
        },
        price: {
          type: Number,
          required: true,
        },
        image: String,
      },
    ],

    shippingAddress: {
      fullName: { type: String, required: true },
      address: { type: String, required: true },
      city: { type: String, required: true },
      zip: { type: String, required: true },
      country: { type: String, required: true },
    },

    paymentMethod: {
      type: String,
      required: true,
      enum: ["Cash on Delivery", "Credit Card", "PayPal", "Razorpay"],
    },
    razorpayOrderId:String,

    paymentResult: {
      id: String,
      status: String,
      update_time: String,
      email_address: String,
    },

    totalPrice: {
      type: Number,
      required: true,
    },

    orderStatus: {
      type: String,
      enum: ["Pending", "Shipped", "Delivered", "Cancelled"],
      default: "Pending", // other values: Shipped, Delivered, Cancelled
    },

    isPaid: {
      type: Boolean,
      default: false,
    },
    paidAt: Date,

    isDelivered: {
      type: Boolean,
      default: false,
    },
    deliveredAt: Date,
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
module.exports = Order; 
