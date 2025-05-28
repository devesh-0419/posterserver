const User = require("../../Schema/userSchema");
const Poster = require("../../Schema/posterSchema");
// const Order = require("../../Schema/Order");
// const Category = require("../../Schema/Category");

exports.getDashboardStats = async (req, res) => {
  const totalUsers = await User.countDocuments();
//   const totalOrders = await Order.countDocuments();
//   const totalRevenue = await Order.aggregate([
//     { $group: { _id: null, total: { $sum: "$totalAmount" } } },
//   ]);
  res.json({
    totalUsers,
    // totalOrders,
    // totalRevenue: totalRevenue[0]?.total || 0,
  });
};
