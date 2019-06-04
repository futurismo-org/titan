import * as firebase from 'firebase/app';
import { configDev, configProd } from './config';

if (firebase.apps.length === 0) {
  if (process.env.APP_ENV === 'development') {
    firebase.initializeApp(configDev);
  } else {
    firebase.initializeApp(configProd);
  }
}

export default firebase;
