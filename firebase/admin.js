// initFirebase.js
const admin = require('firebase-admin');
const serviceAccount = require('../config/serviceAccountKey.json'); // downloaded from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://posterland-165e2-default-rtdb.firebaseio.com"
});

module.exports = admin;
