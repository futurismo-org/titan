const admin = require('firebase-admin');
const fireorm = require('fireorm');
const config = require('./config');

if (!admin.length) {
  admin.initializeApp(config);

  const firestore = admin.firestore();
  firestore.settings({
    timestampsInSnapshots: true
  });

  fireorm.Initialize(firestore);
}

module.exports = { admin };
export {};
