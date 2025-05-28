// middleware/authorizeRoles.js
const jwt = require("jsonwebtoken");

const authorizeRoles = (...allowedRoles) => {
  return (req, res, next) => {
    
    
    try {
      const token = req.cookies.token;
      
      if (!token) {
        return res.status(401).json({ message: "No token provided" });
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded; // contains username, role, etc.

      if (!allowedRoles.includes(decoded.role)) {
        return res.status(403).json({ message: "Access denied: insufficient privileges" });
      }

      next();
    } catch (err) {
      console.log(err);
      
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = authorizeRoles;
