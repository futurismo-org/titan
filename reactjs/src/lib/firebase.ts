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

const firestore = firebase.firestore();

export const remove = (resourceId: string) =>
  firestore.doc(resourceId).delete();

export const create = (resourceId: string, data: any) =>
  firestore.doc(resourceId).set(data);

export const isExist = (resourceId: string) =>
  firestore
    .doc(resourceId)
    .get()
    .then(docSnapshot => docSnapshot.exists);

export default firebase;
