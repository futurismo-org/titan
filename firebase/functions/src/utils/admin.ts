import { configDev, configProd } from './config';

const admin = require('firebase-admin');

if (process.env.NODE_ENV === 'development') {
  if (!admin.app.length) admin.initializeApp(configDev);
} else {
  if (!admin.app.length) admin.initializeApp(configProd);
}

export const db = admin.firestore();
