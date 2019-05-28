import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import { db } from '../../utils/admin';

import {
  MutationResolvers,
  QueryResolvers,
  Resolvers,
  Challenge,
  Category
} from '../gen/graphql-resolver-types';

const Query: QueryResolvers = {
  challenges() {
    return db
      .collection('challenges')
      .get()
      .then((challenges: QuerySnapshot) =>
        challenges.docs.map((challenge: DocumentSnapshot) => {
          const data = challenge.data() as Challenge;
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
      .then((doc: DocumentSnapshot) => {
        const data = doc.data() as Challenge; // TODO Challengeの型定義
        const { id } = doc;
        data.id = id;
        return data;
      });
  },
  categories() {
    return db
      .collection('categories')
      .get()
      .then((categories: QuerySnapshot) =>
        categories.docs.map((category: DocumentSnapshot) => {
          const data = category.data() as Category;
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
      .then((doc: DocumentSnapshot) => {
        const data = doc.data() as Category;
        const { id } = doc;
        data.id = id;
        return data;
      });
  }
};

const Mutation: MutationResolvers = {
  updateChallenge: (headers: any, req: any, res: any) => {
    req.createdAt = Date.now();
    return db
      .collection('challenges')
      .add(req)
      .then(() => req);
  },
  deleteChallenge: (headers: any, req: any, res: any) => {
    const { id } = req;
    return db
      .collection('challenges')
      .doc(id)
      .delete()
      .then(() => id);
  }
};

export const resolvers: Resolvers = {
  Query,
  Mutation
};
