import admin from 'firebase-admin';
import { configDev, configProd } from './config';

if (admin.apps.length === 0) {
  if (process.env.APP_ENV === 'development') {
    admin.initializeApp(configDev, 'cloudfunctions(development)');
  } else {
    admin.initializeApp(configProd, 'cloudfunction(production)');
  }
}

export const functions = require('firebase-functions').region(
  'asia-northeast1'
);

export default admin;
