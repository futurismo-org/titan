// require all dependencies to set up server
const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
// cors allows our server to accept requests from different origins
const cors = require('cors');

function configureServer() {
  // invoke express to create our server
  const app = express();
  // use the cors middleware
  app.use(cors());

  // Simple graphql schema
  const typeDefs = gql`
    type Query {
      "A simple type for getting started!"
      hello: String
    }
  `;
  // Very simple resolver that returns "world" for the hello query
  const resolvers = {
    Query: {
      hello: () => 'world'
    }
  };
  const server = new ApolloServer({
    typeDefs,
    resolvers
  });
  // now we take our newly instantiated ApolloServer and apply the   // previously configured express application
  server.applyMiddleware({ app });
  // finally return the application
  return app;
}
module.exports = configureServer;
