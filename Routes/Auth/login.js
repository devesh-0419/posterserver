// routes/auth.js
const express = require("express");
const authToken = require('../../Middleware/authToken')
const bcrypt = require("bcrypt");
const User = require("../../Schema/userSchema");
const router = express();

router.post("/", async (req, res) => {
    const { identifier, password } = req.body; // identifier = email or username

    try {
        const user = await User.findOne({
            $or: [{ email: identifier }, { username: identifier }],
        });

        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" });
        }
//   console.log(user.password);
  
        const isMatch = await bcrypt.compare(password, user.password);
        // (password==user.password)?true:false;
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
        }

        const payload = {
            username: user.username,
            role: user.role,
        };

      authToken(payload, res);

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" }); 
    }
});

module.exports = router;
