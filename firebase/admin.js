// // initFirebase.js
// const admin = require('firebase-admin');
// require('dotenv').config();
// console.log('serviceAccount', process.env.SERVICE_ACCOUNT_KEY);

// const serviceAccount = JSON.parse(Buffer.from(process.env.SERVICE_ACCOUNT_KEY, 'base64').toString()); // downloaded from Firebase Console
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://posterland-165e2-default-rtdb.firebaseio.com"
// });

// module.exports = admin;
