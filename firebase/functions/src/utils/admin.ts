import admin from 'firebase-admin';
import { configDev, configProd } from './config';

if (admin.apps.length === 0) {
  if (process.env.APP_ENV === 'development') {
    admin.initializeApp(configDev);
  } else {
    admin.initializeApp(configProd);
  }
}

export const functions = require('firebase-functions').region(
  'asia-northeast1'
);

export default admin;
