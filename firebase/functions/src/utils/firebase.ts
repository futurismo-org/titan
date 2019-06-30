import * as firebase from 'firebase/app';
import { configDev, configProd } from './config';

if (firebase.apps.length === 0) {
  if (process.env.APP_ENV === 'production') {
    firebase.initializeApp(configProd);
  } else {
    firebase.initializeApp(configDev);
  }
}

export default firebase;
