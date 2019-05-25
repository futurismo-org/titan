import * as _ from 'firebase';

const { db } = require('../../utils/admin');
const { firebase } = require('../../utils/firebase');

const resolveFunctions = {
  Query: {
    challenges() {
      return db
        .collection('challenges')
        .get()
        .then((challenges: _.firestore.QuerySnapshot) =>
          challenges.docs.map(challenge => {
            const data = challenge.data();
            const { id } = challenge;
            return data;
          })
        );
    },
    challenge: (req: any) => {
      return db
        .collection('challenges')
        .doc(req.id)
        .get()
        .then((doc: _.firestore.DocumentSnapshot) => {
          const data = doc.data();
          const { id } = doc;
          data.id = id;
          return data;
        });
    }
  },
  Mutation: {
    updateChallenge: (req: any) => {
      req.created_at = Date.now();
      return db
        .collection('challenges')
        .add(req)
        .then(() => req);
    },
    deleteChallenge: (req: any) => {
      const { id } = req;
      return db
        .collection('challenges')
        .doc(id)
        .delete()
        .then(() => id);
    }
  }
};

module.exports = resolveFunctions;
