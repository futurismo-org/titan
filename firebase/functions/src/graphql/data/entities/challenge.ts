const { Field, ID, ObjectType } = require('type-graphql');
const Pring = require('pring');

const property = Pring.property;

@ObjectType()
class Challenge extends Pring.Base {
  @Field((type: string) => ID)
  @property
  id?: string;

  @Field()
  @property
  title?: string;

  @Field()
  @property
  description?: string;
}

module.exports = Challenge;
export {};
