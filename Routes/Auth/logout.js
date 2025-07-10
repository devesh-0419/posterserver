// routes/auth.js
const express = require("express");
const router = express();

router.post("/", (req, res) => {

    res.clearCookie('token', { path: '/', httpOnly: true });
    res.send({ message: 'Logged out' });

    });

module.exports = router;
