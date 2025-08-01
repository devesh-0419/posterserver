// // POST /api/auth/google
// const express = require('express');
// const router = express.Router();
// const admin = require('../../firebase/admin');
// const User = require('../../Schema/userSchema'); // your DB model
// const authToken = require('../../middleware/authToken')
// router.post('/', async (req, res) => {
//   const { token } = req.body;

//   try {
//     const decodedToken = await admin.auth().verifyIdToken(token);
//     const { email, name, picture, uid } = decodedToken;

//     // Check if user already exists
//     let user = await User.findOne({ email });
//     if (!user) {
//       // Register new user
//       user = await User.create({ email, name, username:email, profilePicture:picture, googleUid: uid });
//     }
    
//     const payload = {
//            username: user.username,
//            role: user.role,
//        };
//     // Generate your app's JWT or session

//       authToken(payload, res);

//  return res.status(200).json({ message: "Login successful",via: "Google Authentication" });

//   } catch (err) {
//     console.error(err);
//     res.status(401).json({ message: 'Invalid token' });
//   }
// });

// module.exports = router;
