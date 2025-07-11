// middleware/authorizeRoles.js
const jwt = require("jsonwebtoken");

const alreadyLogIn = () => {
  return (req, res, next) => {
    
    
    try {
      const token = req.cookies.token;
      // console.log('token', req.cookies)
      // For now I am not checking whether the token is valid or not 
      if (token) {
     return res.status(200).json({ message: "Already Logged IN.." });
      }
      

      next();
    } catch (err) {
      console.log(err);
      
      return res.status(401).json({ message: "Invalid or expired token" });
    }
  };
};

module.exports = alreadyLogIn;
