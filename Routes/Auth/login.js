// routes/auth.js
const express = require("express");
const jwt = require("jsonwebtoken");
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

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn: "60m",
        });

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "development", // true on prod
            maxAge: 60 * 60 * 1000, // 60 minutes
        });

        res.status(200).json({ message: "Login successful" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: "Server error" }); 
    }
});

module.exports = router;
