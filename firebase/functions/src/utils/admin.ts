import { configDev, configProd } from './config';

const admin = require('firebase-admin');

if (admin.apps.length === 0) {
  if (process.env.APP_ENV === 'production') {
    admin.initializeApp(configProd);
  } else {
    admin.initializeApp(configDev);
  }
}

export const functions = require('firebase-functions').region('us-central1');

export default admin;
