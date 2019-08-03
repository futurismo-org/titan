import * as firebase from 'firebase/app';
import { configDev, configProd } from './config';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

if (firebase.apps.length === 0) {
  if (
    process.env.REACT_APP_ENV === 'development' ||
    process.env.NODE_ENV === 'development'
  ) {
    firebase.initializeApp(configDev);
  } else {
    firebase.initializeApp(configProd);
  }
}

export const deleteResource = (resourceId: string) =>
  firebase
    .firestore()
    .doc(resourceId)
    .delete();

export default firebase;
