import { configDev, configProd, configDemo } from './config';

const admin = require('firebase-admin');

if (admin.apps.length === 0) {
  if (process.env.APP_ENV === 'production') {
    admin.initializeApp(configProd);
  } else {
    if (process.env.REACT_APP_ENV === 'demonstration') {
      admin.initializeApp(configDemo);
    } else {
      admin.initializeApp(configDev);
    }
  }
}

export const functions = require('firebase-functions').region(
  'asia-northeast1'
);

export default admin;
