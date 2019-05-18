const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-cloud-functions');
const resolvers = require('./resolvers');

const schema = gql`
  type Query {
    groups: [Group]
  }
  type Group {
    name: String!
    count: Int!
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});
