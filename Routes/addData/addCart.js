// cartRoutes.js
const express = require('express');
const router = express.Router();
const Cart = require('../../Schema/cartSchema'); 
const User = require('../../Schema/userSchema');
const Poster = require('../../Schema/posterSchema')// Update the path based on your file structure

// POST route to add an item to the cart
router.post('/addToCart', async (req, res) => {
  try {
    const { email, productId, quantity } = req.body;
    let user = await User.findOne({email})
    // Check if the user has an existing cart
    let userId = user._id;
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // If the user doesn't have a cart, create a new one
      cart = new Cart({ user: userId });
    }

    // Check if the product is already in the cart
    const existingItem = cart.items.find(item => item.productId.toString() === productId);
   const poster = await Poster.findById(productId);
    if (existingItem) {
      // If the product is already in the cart, update the quantity
      existingItem.quantity += quantity;
    } else {
      // If the product is not in the cart, add a new item
      cart.items.push({ productId, quantity });
    }

    // Calculate the total price
    cart.totalPrice = cart.items.reduce((total, item) => {
      return total + (item.quantity * poster.price);
    }, 0);

    // Save the updated cart
    await cart.save();

    res.status(200).json({ success: true, message: 'Item added to cart successfully', cart });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});

module.exports = router;
