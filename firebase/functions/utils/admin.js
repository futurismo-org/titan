const admin = require('firebase-admin');
const config = require('./config');

admin.initializeApp(config);

const db = admin.firestore();
const auth = admin.auth();

module.exports = { admin, db, auth };
