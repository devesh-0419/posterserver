const express = require("express");
const router = express.Router();
const authorizeRoles = require("../../Middleware/authorizeRoles");
const User = require("../../Schema/userSchema"); 

// routes/userRoutes.js
router.get('/', authorizeRoles("buyer", "admin"), async (req, res) => {
  try {
        const { username } = req.user; 
console.log('req.body', req.body);

const user = await User.findOne({ $or: [{ email:username }, { username}] }).populate('favoritePosters');
console.log('user.favoritePosters', user.favoritePosters);
    res.json(user.favoritePosters);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch favourites' });
  }
});

module.exports = router;
