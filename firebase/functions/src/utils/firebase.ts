import { configDev, configProd } from './config';

const firebase = require('firebase');

if (process.env.NODE_ENV === 'development') {
  if (!firebase.app.length) firebase.initializeApp(configDev);
} else {
  if (!firebase.app.length) firebase.initializeApp(configProd);
}

module.exports = { firebase };
