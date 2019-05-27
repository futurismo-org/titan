const { db } = require('./utils/admin');

const createUser = (user: any) => {
  const { uid } = user;
  const displayName = user.displayName || 'Anonymous';
  const email = user.email || '';
  const photoURL = user.photoURL || '';

  return db
    .collection('users')
    .doc(uid)
    .set({
      userName: displayName,
      photoUrl: photoURL,
      email,
      createOn: new Date()
    })
    .then(() => {
      console.log('Success'); // eslint-disable-line no-console
    });
};

module.exports = {
  createUser
};
export {};
