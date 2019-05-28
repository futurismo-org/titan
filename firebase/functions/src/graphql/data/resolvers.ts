import { DocumentSnapshot, QuerySnapshot } from '@google-cloud/firestore';
import { ulid } from 'ulid';
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
        challenges.docs.map(
          (challenge: DocumentSnapshot) => challenge.data() as Challenge
        )
      );
  },
  challenge: (headers: any, req: any, res: any) => {
    return db
      .collection('challenges')
      .doc(req.id)
      .get()
      .then((doc: DocumentSnapshot) => doc.data() as Challenge);
  },
  categories() {
    return db
      .collection('categories')
      .get()
      .then((categories: QuerySnapshot) =>
        categories.docs.map(
          (category: DocumentSnapshot) => category.data() as Category
        )
      );
  },
  category: (headers: any, req: any, res: any) => {
    return db
      .collection('categories')
      .doc(req.id)
      .get()
      .then((doc: DocumentSnapshot) => doc.data() as Category);
  }
};

const Mutation: MutationResolvers = {
  updateChallenge: (headers: any, req: any, res: any) => {
    req.createdAt = Date.now();
    req.id = ulid();

    return db
      .collection('challenges')
      .doc(req.id)
      .set(req)
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
