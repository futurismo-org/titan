import { resolvers } from './data/resolvers';
import typeDefs from './data/schema';

const { ApolloServer, gql } = require('apollo-server-cloud-functions');

const setupGraphQLServer = () => {
  const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers as any,
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
