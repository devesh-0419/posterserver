const bcrypt = require("bcrypt");
const express = require('express');
const router = express.Router();
const User = require('../../Schema/userSchema'); // Import your User model

// Create a new user
router.post('/', async (req, res) => {
  try {
    const { name, email, password, username, role } = req.body; // Assuming you pass these values in the request body

// Inside your registration route:
// Check if a user with the same email or username already exists
const existingUser = await User.findOne({ $or: [{ email }, { username }] });

if (existingUser) {
  return res.status(400).json({ error: 'User already exists' });
}


// Create a new user instance
const newUser = new User({
      name,
      email,
      password,
      username,
      role, // You can set the user's role in the request body
    });

    // Save the user to the database
    await newUser.save();

    res.status(201).json({ message: 'User registered successfully' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: error.message||'User registration failed' });
  }
});

module.exports = router;
