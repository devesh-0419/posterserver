// middleware/verifyAdmin.js
const jwt = require("jsonwebtoken");

const verifyAdmin = (req, res, next) => {
    const token = req.cookies?.token; // assuming cookie name is 'token'

    if (!token) return res.status(401).json({ message: "Access denied. No token." });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        if (decoded.role !== "admin") {
            return res.status(403).json({ message: "Forbidden. Admins only." });
        }

        req.user = decoded; // forward user info to next middleware/handler
        next();
    } catch (err) {
        return res.status(400).json({ message: "Invalid token." });
    }
};

module.exports = verifyAdmin;
