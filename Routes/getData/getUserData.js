const express = require("express");
const router = express.Router();
const User = require("../../Schema/userSchema"); 
const authorizeRoles = require("../../Middleware/authorizeRoles");

router.get("/", authorizeRoles("buyer","seller","admin"), async (req, res) => {
  try {
    // console.log('token', req.cookies)
    const user = await User.findOne({username:req.user.username}).select("-password -_id");
    if (!user) return res.status(404).json({ message: "User not found" });

    const userObject = user.toObject(); 

    if (userObject.role === "buyer") {
      delete userObject.sellerDetails;
    }
    res.json(userObject);
  } catch (error) {
    console.log(error.message);
    
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;