const admin = require('firebase-admin');
const serviceAccount = require('./firebaseServiceAccountKey.json'); // path to your key

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();

module.exports = db;
