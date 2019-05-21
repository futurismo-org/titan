const { auth, db } = require('../../utils/admin');

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
    }
  },
  Auth: {
    signUp: (headers, req, res) => {
      const newUser = {
        email: req.email,
        password: req.password,
        confirmPassword: req.confirmPassword,
        handle: req.handle
      };

      // TODO validate user

      return auth
        .createUserWithEmailAndPassword(newUser.email, newUser.password)
        .then(data => `user ${data.user.uid} signup up successfully`)
        .catch(err => err.code);
    }
  }
};

module.exports = resolveFunctions;
