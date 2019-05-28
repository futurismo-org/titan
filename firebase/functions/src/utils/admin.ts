import admin from 'firebase-admin';

const config = require('./config');

if (!admin.app.length) admin.initializeApp(config);

export const db = admin.firestore();

export default { admin };
