const mongoose = require("mongoose");

const cartItemSchema = new mongoose.Schema(
  {
    product: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Product", // Consistent with Order schema
      required: true,
    },
    name: { type: String }, // Optional: store snapshot of product name
    quantity: {
      type: Number,
      required: true,
      default: 1,
      min: 1,
    },
    price: { type: Number }, // Optional: store snapshot of product price
    image: { type: String }, // Optional: store snapshot of product image
  },
  { _id: false }
);

const cartSchema = new mongoose.Schema(
  {
    user: { 
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cartItems: [cartItemSchema],
    totalPrice: {
      type: Number,
      required: true,
      default: 0,
      min: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Cart", cartSchema);
