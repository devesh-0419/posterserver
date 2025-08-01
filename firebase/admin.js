// initFirebase.js
const admin = require('firebase-admin');

require('dotenv').config();
// console.log('serviceAccount', process.env.SERVICE_ACCOUNT_KEY);

const serviceAccount = JSON.parse(process.env.SERVICE_ACCOUNT_KEY); // downloaded from Firebase Console
console.log('serviceAccount', serviceAccount);
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://posterland-165e2-default-rtdb.firebaseio.com"
});

module.exports = admin;
