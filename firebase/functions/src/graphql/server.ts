import { buildSchema } from 'type-graphql';
import { ApolloServer } from 'apollo-server-cloud-functions';
import ChallengeResolver from './data/resolvers/challenge-resolver';

const path = require('path');

const setupGraphQLServer = async () => {
  // Provide resolver functions for your schema fields
  const schema = await buildSchema({
    resolvers: [ChallengeResolver],
    emitSchemaFile: path.resolve(__dirname, 'schema.gql')
  });

  // console.log(require('./data/schema')); // eslint-disable-line
  // console.log(schema); // eslint-disable-line

  const server = new ApolloServer({
    // schema: require('./data/schema'),
    schema: schema,
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
