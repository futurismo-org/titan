import * as _ from 'firebase';

const { db } = require('./../../utils/admin');

const resolveFunctions = {
  Query: {
    challenges() {
      return db
        .collection('challenges')
        .get()
        .then((challenges: _.firestore.QuerySnapshot) =>
          challenges.docs.map((challenge: _.firestore.DocumentSnapshot) => {
            const data: any = challenge.data();
            const { id } = challenge;
            data.id = id;
            return data;
          })
        );
    },
    challenge: (headers: any, req: any, res: any) => {
      return db
        .collection('challenges')
        .doc(req.id)
        .get()
        .then((doc: _.firestore.DocumentSnapshot) => {
          const data: any = doc.data(); // TODO Challengeの型定義
          const { id } = doc;
          data.id = id;
          return data;
        });
    },
    categories() {
      return db
        .collection('categories')
        .get()
        .then((categories: _.firestore.QuerySnapshot) =>
          categories.docs.map(category => {
            const data = category.data();
            const { id } = category;
            data.id = id;
            return data;
          })
        );
    },
    category: (headers: any, req: any, res: any) => {
      return db
        .collection('categories')
        .doc(req.id)
        .get()
        .then((doc: _.firestore.DocumentSnapshot) => {
          const data: any = doc.data();
          const { id } = doc;
          data.id = id;
          return data;
        });
    }
  },
  Mutation: {
    updateChallenge: (req: any) => {
      req.createdAt = Date.now();
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
