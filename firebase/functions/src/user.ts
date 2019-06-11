import { DocumentReference, Transaction } from '@google-cloud/firestore';
import firebase from 'firebase';

import admin from './utils/admin';

const createUser = (user: firebase.User) => {
  const { uid } = user;
  const displayName = user.displayName || 'anonymous';
  const email = user.email || '';
  const photoURL = user.photoURL || `${process.env.PUBLIC_URL}/anonymous.png`;

  const data = {
    id: uid,
    displayName,
    photoURL,
    email,
    createdAt: new Date(),
    updatedAt: new Date()
  };

  const userRef: DocumentReference = admin
    .firestore()
    .collection('users')
    .doc(uid);

  admin
    .firestore()
    .runTransaction(async (transaction: Transaction) => {
      await transaction.update(userRef, data);
    })
    .then(() => console.log('successfully updated'))
    .catch(() => userRef.set(data));

  return true;
};

module.exports = {
  createUser
};
