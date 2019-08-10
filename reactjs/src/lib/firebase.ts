import * as firebase from 'firebase/app';
import axios from 'axios';
import { configDev, configProd } from './config';

import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const Blob = require('blob');

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

const getBase64 = (url: string) => {
  return axios
    .get(url, {
      responseType: 'arraybuffer'
    })
    .then(response => new Blob([response.data]));
};

export const uploadToStorage = (
  photoURL: string,
  userShortId: string,
  resourceId: string
) => {
  const url = photoURL.replace('_normal.', '.');
  getBase64(url).then((binary: any) => {
    const storageRef = firebase.storage().ref();
    const avatarImagesRef = storageRef.child(`users/${userShortId}/avatar.png`);

    return avatarImagesRef
      .put(binary)
      .then(() => avatarImagesRef.getDownloadURL())
      .then(url =>
        firebase
          .firestore()
          .doc(resourceId)
          .update({ photoURL: url })
      );
  });
};

export default firebase;
