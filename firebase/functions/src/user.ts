import firebase from 'firebase';

const { db } = require('./utils/admin');

const createUser = (user: firebase.User) => {
  const { uid } = user;
  const displayName = user.displayName || 'anonymous';
  const email = user.email || '';
  const photoURL = user.photoURL || `${process.env.PUBLIC_URL}/anonymous.png`;

  return db
    .collection('users')
    .doc(uid)
    .set({
      id: uid,
      displayName,
      photoURL,
      email,
      createdAt: new Date(),
      updatedAt: new Date()
    })
    .then(() => {
      console.log('Success'); // eslint-disable-line no-console
    });
};

module.exports = {
  createUser
};
