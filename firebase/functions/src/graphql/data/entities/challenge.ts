const { Field, ID, ObjectType } = require('type-graphql');
const { GetRepository, Collection } = require('fireorm');

@Collection('challenges')
@ObjectType
class Challenge {
  @Field((type: any) => ID)
  readonly id: string;

  @Field()
  title: string;

  @Field()
  description: string;
}

const challengeModel = GetRepository(Challenge);
export {};
