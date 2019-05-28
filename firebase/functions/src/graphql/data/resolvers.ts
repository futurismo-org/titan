import {
  MutationResolvers,
  QueryResolvers,
  Resolvers
} from '../gen/graphql-resolver-types';

import { db } from '../../utils/admin';

const Query: QueryResolvers = {
  challenges() {
    return db
      .collection('challenges')
      .get()
      .then((challenges: any) =>
        challenges.docs.map((challenge: any) => {
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
      .then((doc: any) => {
        const data: any = doc.data(); // TODO Challengeの型定義
        const { id } = doc;
        data.id = id;
        return data;
      });
  }
};

const resolveFunctions = {
  Query: {
    challenges() {
      return db
        .collection('challenges')
        .get()
        .then((challenges: any) =>
          challenges.docs.map((challenge: any) => {
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
        .then((doc: any) => {
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
        .then((categories: any) =>
          categories.docs.map((category: any) => {
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
        .then((doc: any) => {
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

const resolvers: Resolvers = {
  Query
  // Mutation
};

export default resolvers;
