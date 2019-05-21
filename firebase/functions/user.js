import { db } from './utils/admin';

const createUser = evt => {
  const user = evt.data; // The Firebase user. Type: functions.auth.UserRecord

  const { uid } = user;
  const displayName = user.displayName || 'Anonymous';
  const email = user.email || '';
  const photoURL = user.photoURL || '/assets/img/default_profile.svg';

  return db
    .collection('users')
    .doc(uid)
    .set({
      user_name: displayName,
      photo_url: photoURL,
      email,
      create_on: new Date()
    })
    .then(() => {
      console.log('Success'); // eslint-disable-line no-console
    })
    .catch(err => {
      console.log(err); // eslint-disable-line no-console
    });
};

module.exports = {
  createUser
};
