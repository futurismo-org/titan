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
const Challenge = require('../entities/challenge');

@Resolver(() => Challenge)
class ChallengeResolver {
  @Query(() => [Challenge])
  async challenges(): Promise<any> {
    return await Challenge.find({});
  }
}
