const { db } = require('../../utils/admin');

const resolveFunctions = {
  Query: {
    groups() {
      return db
        .collection('groups')
        .get()
        .then(groups => groups.docs.map(group => group.data()));
    }
  }
};

module.exports = resolveFunctions;
