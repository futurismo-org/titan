import * as _ from 'firebase';

require('reflect-metadata');

const {
  Resolver,
  Query,
  FieldResolver,
  Arg,
  Root,
  Mutation,
  Float,
  Int,
  ResolverInterface
} = require('type-graphql');

const { Field, ID, ObjectType } = require('type-graphql');
const { db } = require('./../../../utils/admin');

// const Pring = require('pring');

// const property = Pring.property;

// class Challenge extends Pring.Base {
@ObjectType()
class Challenge {
  @Field((type: any) => ID)
  id?: string;

  @Field()
  title?: string;

  @Field()
  description?: string;
}

@Resolver()
class ChallengeResolver {
  private recipesCollection: Challenge[] = [];

  @Query((returns: any) => [Challenge])
  async challenges() {
    return await this.recipesCollection;
  }
}

// @Resolver(Challenge)
// class ChallengeResolver {
//   @Query(() => [Challenge])
//   challenges(): Promise<Challenge[]> {
//     console.log('start'); // eslint-disable-line
//     return db
//       .collection('challenges')
//       .get()
//       .then((challenges: _.firestore.QuerySnapshot) =>
//         challenges.docs.map((challenge: _.firestore.DocumentSnapshot) => {
//           const data: any = challenge.data();
//           const { id } = challenge;
//           data.id = id;
//           return data;
//         })
//       );
//   }
// }

module.exports = { ChallengeResolver };
export {};
