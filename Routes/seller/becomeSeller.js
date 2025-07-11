const express= require('express');
const router = express.Router();

const authorizeRoles = require('../../middleware/authorizeRoles');
const User = require('../../Schema/userSchema');

router.post('/', authorizeRoles("buyer","seller","admin"), async (req, res) => {
  try {
    const userId = req.user.id; // from JWT
    const {
      storeName,
      description,
      contactNumber,
      category,
      gstNumber,
      upiId,
    } = req.body;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    user.role = 'seller';
    user.sellerDetails = {
      isSeller: true,
      storeName,
      description,
      contactNumber,
      category,
      gstNumber,
      upiId,
      createdAt: new Date(),
    };

    await user.save();
    return res.json({ success: true, message: "You are now a seller." });

  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
});

module.exports = router;