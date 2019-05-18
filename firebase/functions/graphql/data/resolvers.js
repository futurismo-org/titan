const admin = require('firebase-admin');

const resolveFunctions = {
  Query: {
    async groups() {
      const groups = await admin
        .firestore()
        .collection('groups')
        .get();
      return groups.docs.map(group => group.data());
    }
  }
};

module.exports = resolveFunctions;
