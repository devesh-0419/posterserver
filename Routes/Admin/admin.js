const express = require("express")
const verifyAdmin = require("../../middleware/verifyAdmin")
const authorizeRoles = require("../../middleware/authorizeRoles")
const  router  = express()
const Order = require("../../Schema/orderSchema");
const Poster = require("../../Schema/posterSchema");
const User = require("../../Schema/userSchema");


// Admin Dashboard Summary Route with Admin Details
router.get("/", authorizeRoles("admin"), async (req, res) => {
  try {
    // Summary stats
    const [totalUsers, totalOrders, totalProducts, totalSales] = await Promise.all([
      User.countDocuments(),
      Order.countDocuments(),
      Poster.countDocuments(),
      Order.aggregate([
        { $match: { isPaid: true } },
        { $group: { _id: null, total: { $sum: "$totalPrice" } } },
      ]),
    ]);
    const totalRevenue = totalSales[0]?.total || 0;

    // Get admin details
    // If isAdmin middleware sets req.user, use that.
    // Otherwise, fetch from DB using req.user._id (assuming JWT auth).
    let adminDetails;
    if (req.user) {
      // Only select safe fields
      adminDetails = {
        _id: req.user._id,
        username: req.user.username,
        email: req.user.email,
        role: req.user.role,
        createdAt: req.user.createdAt,
      };
    } else {
      // Fallback: fetch from DB (if needed)
      adminDetails = await User.find({username:req.user.username}).select("_id name email role createdAt");
    }

    res.status(200).json({
      success: true,
      summary: {
        totalUsers,
        totalOrders,
        totalProducts,
        totalRevenue,
      },
      admin: adminDetails,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to load dashboard summary",
      error: error.message,
    });
  }
});

module.exports = router;
