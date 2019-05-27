const { buildSchema } = require('type-graphql');

require('../utils/admin');
const { ApolloServer } = require('apollo-server-cloud-functions');
const { ChallengeResolver } = require('./data/resolvers/challenge-resolver');

const setupGraphQLServer = () => {
  // Provide resolver functions for your schema fields
  const server = new ApolloServer({
    schema: buildSchema({
      resolvers: [ChallengeResolver],
      emitSchemaFile: './schema.gql'
    }),
    playground: true,
    introspection: true,
    context: (req: any, res: any) => ({
      headers: req.headers,
      req,
      res
    })
  });

  const corsConfig = {
    cors: {
      origin: true,
      credentials: true
    }
  };

  return server.createHandler(corsConfig);
};

module.exports = setupGraphQLServer;
export {};
