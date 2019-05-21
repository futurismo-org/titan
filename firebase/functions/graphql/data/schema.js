const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-cloud-functions');
const resolvers = require('./resolvers');

const schema = gql`
  type Query {
    groups: [Group]
  }
  type Group {
    id: ID!
    name: String!
    count: Int!
  }
  type Mutation {
    addGroup(name: String!): Group
  }
  type Auth {
    signUp(email: String!, password: String!, confirmPassword: String!, handle: String!)
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});
