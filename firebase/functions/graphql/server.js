const { ApolloServer, gql } = require('apollo-server-cloud-functions');

const setupGraphQLServer = () => {
  // Construct a schema, using GraphQL schema language
  const typeDefs = gql`
    type Query {
      hello: String
    }
  `;

  // Provide resolver functions for your schema fields
  const resolvers = {
    Query: {
      hello: () => 'Hello world!'
    }
  };

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    playground: true,
    introspection: true
  });

  return server.createHandler();
};

module.exports = setupGraphQLServer;
