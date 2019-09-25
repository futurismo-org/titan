import * as firebase from 'firebase/app';
import { configDev, configProd, configDemo } from './config';

if (firebase.apps.length === 0) {
  if (process.env.APP_ENV === 'production') {
    firebase.initializeApp(configProd);
  } else if (process.env.APP_ENV === 'demonstration') {
    firebase.initializeApp(configDemo);
  } else {
    firebase.initializeApp(configDev);
  }
}

export default firebase;
