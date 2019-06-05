import { DocumentReference, Transaction } from '@google-cloud/firestore';
import firebase from 'firebase';

const { db } = require('./utils/admin');

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

  const userRef: DocumentReference = db.collection('users').doc(uid);

  db.runTransaction(async (transaction: Transaction) => {
    await transaction.update(userRef, data);
  }).then(() => console.log('successfully updated'));
};

module.exports = {
  createUser
};
