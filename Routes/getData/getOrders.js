const express = require("express");
const router = express.Router();
const Order = require("../../Schema/orderSchema"); 
const authorizeRoles = require("../../middleware/authorizeRoles");
const User = require("../../Schema/userSchema"); 
router.get("/", authorizeRoles("buyer", "admin"), async (req, res) => {
  try {
    const userEmail = req.user?.username || req.user?.email; 

    if (!userEmail) {
      return res.status(401).json({ message: "Unauthorized: No email in token" });
    }

        const { username } = req.user; 
console.log('req.body', req.body);

const user = await User.findOne({ $or: [{ email:username }, { username}] }); 

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Step 2: Find orders by user._id
    const orders = await Order.find({ user: user._id })
      .populate("orderItems.product", "name price");

    // Step 3: Split orders
    const active = orders.filter(
      (order) => order.orderStatus !== "Delivered" && order.orderStatus !== "Cancelled"
    );

    const history = orders.filter(
      (order) => order.orderStatus === "Delivered" || order.orderStatus === "Cancelled"
    );

    res.json({ active, history });

  } catch (error) {
    console.error("Error fetching orders:", error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
