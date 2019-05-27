const path = require('path');

require('../utils/admin');
const { buildSchema } = require('type-graphql');
const { ApolloServer } = require('apollo-server-cloud-functions');
const resolvers = require('./data/resolvers');
const { ChallengeResolver } = require('./data/resolvers/challenge-resolver');

const setupGraphQLServer = async () => {
  // Provide resolver functions for your schema fields
  const schema = await buildSchema({
    resolvers: [ChallengeResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  });

  const server = new ApolloServer({
    schema: schema,
    resolvers: resolvers,
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
