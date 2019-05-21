const { db } = require('../../utils/admin');
const { firebase } = require('../../utils/firebase');

const resolveFunctions = {
  Query: {
    groups() {
      return db
        .collection('groups')
        .get()
        .then(groups => groups.docs.map(group => group.data()));
    }
  },
  Mutation: {
    addGroup: (headers, req, res) => {
      const { name } = req;
      const newGroup = {
        id: 3,
        name,
        count: 0
      };
      return db
        .collection('groups')
        .add(newGroup)
        .then(() => newGroup);
    },
    signUp: (headers, req, res) => {
      const newUser = {
        email: req.email,
        password: req.password,
        confirmPassword: req.confirmPassword,
        handle: req.handle
      };

      // TODO validate user

      return firebase
        .auth()
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => `user ${data.user.uid} signup up successfully`)
        .catch(err => err.code);
    },
    signUpWithTwitter: (headers, req, res) => {
      const provider = new firebase.auth.TwitterAuthProvider();
      return firebase
        .auth()
        .signInWithPopup(provider)
        .then(result => {
          const token = result.credential.accessToken;
          const { secret } = result.credential;
          const { user } = result;

          return `user ${user} signup up successfully`;
        })
        .catch(error => {
          const errorCode = error.code;
          const errorMessage = error.message;
          const { email } = error;
          const { credential } = error;

          return errorMessage;
        });
    }
  }
};

module.exports = resolveFunctions;
