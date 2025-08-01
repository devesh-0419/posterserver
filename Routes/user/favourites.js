const express = require('express');
const router = express.Router();
const User = require('../../Schema/userSchema');
const Poster = require('../../Schema/posterSchema');
const authorizeRoles = require("../../Middleware/authorizeRoles");

// ✅ POST (Add) a poster to favourites
router.post('/', authorizeRoles("buyer", "seller", "admin"), async (req, res) => {
  try {
    const { posterId } = req.body;
    const { username } = req.user;

    const user = await User.findOne({ $or: [{ email: username }, { username }] });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    if (!posterId) {
      return res.status(400).json({ error: 'posterId is required' });
    }

    if (user.favoritePosters.includes(posterId)) {
      return res.status(400).json({ error: 'Poster already in favourites' });
    }

    user.favoritePosters.push(posterId);
    await user.save();

    res.status(200).json({ message: 'Added to favourites successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to add to favourites' });
  }
});

// ✅ DELETE a poster from favourites by ID
router.delete('/:posterId', authorizeRoles("buyer", "seller", "admin"), async (req, res) => {
  try {
    const { posterId } = req.params;
    const { username } = req.user;

    const user = await User.findOne({ $or: [{ email: username }, { username }] });

    if (!user) {
      return res.status(400).json({ error: 'User does not exist' });
    }

    const index = user.favoritePosters.indexOf(posterId);
    if (index === -1) {
      return res.status(400).json({ error: 'Poster not found in favourites' });
    }

    user.favoritePosters.splice(index, 1);
    await user.save();

    res.status(200).json({ message: 'Removed from favourites successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message || 'Failed to remove from favourites' });
  }
});

module.exports = router;
