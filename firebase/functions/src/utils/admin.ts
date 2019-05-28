const admin = require('firebase-admin');
const config = require('./config');

export const initializeApp = () => {
  if (!admin.app.length) admin.initializeApp(config);
};
export const db = admin.firestore();
