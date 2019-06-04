const admin = require('firebase-admin');

let config: any;
if (process.env.development) {
  config = require('./config');
} else {
  config = require('./config.prod');
}

export const initializeApp = () => {
  if (!admin.app.length) admin.initializeApp(config);
};
export const db = admin.firestore();
