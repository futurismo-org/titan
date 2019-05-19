const { db } = require('../../utils/admin');

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
  }
};

module.exports = resolveFunctions;
