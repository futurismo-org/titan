import * as firebase from 'firebase/app';
import { configDev, configProd, configDemo } from './config';

import 'firebase/auth';
import 'firebase/firestore';

if (firebase.apps.length === 0) {
  if (process.env.REACT_APP_ENV === 'development') {
    firebase.initializeApp(configDev);
  } else if (process.env.REACT_APP_ENV === 'demonstraion') {
    firebase.initializeApp(configDemo);
  } else {
    firebase.initializeApp(configProd);
  }
}

export default firebase;
