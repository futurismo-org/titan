import { configDev, configProd, configDemo } from './config';

const func = require('firebase-functions');
const admin = require('firebase-admin');

if (admin.apps.length === 0) {
  if (func.config().app && func.config().app.env === 'production') {
    admin.initializeApp(configProd);
  } else if (func.config().app && func.config().app.env === 'demonstration') {
    admin.initializeApp(configDemo);
  } else {
    admin.initializeApp(configDev);
  }
}

export const functions = require('firebase-functions').region('us-central1');

export default admin;
