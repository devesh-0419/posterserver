const express = require('express');
const router = express.Router();
const Poster = require('../../Schema/posterSchema'); // Import your Poster model
const User = require('../../Schema/userSchema'); // Import your User model
const authorizeRoles = require('../../middleware/authorizeRoles');


// Create a new poster
router.post('/',authorizeRoles("seller","admin"), async (req, res) => {
  try {
    const { title, description, price, imageUrl, username, category, condition } = req.body;
    console.log(req.user);
    
    // Find the seller's ID by username
    const seller = await User.findOne({ username:req.user.username });

    if (!seller) {
      return res.status(400).json({ error: 'Seller not found' });
    }

    // Create a new poster instance
    const newPoster = new Poster({
      title,
      description,
      price,
      imageUrl,
      seller: seller._id, // Use the seller's ID
      category,
      condition,
    });

    // Save the poster to the database
    await newPoster.save();

    res.status(201).json({ message: 'Poster added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Poster creation failed' });
  }
});

module.exports = router;
