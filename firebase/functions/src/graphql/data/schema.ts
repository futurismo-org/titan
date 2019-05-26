const { makeExecutableSchema } = require('graphql-tools');
const { gql } = require('apollo-server-cloud-functions');
const resolvers = require('./resolvers');

const schema = gql`
  type Query {
    groups: [Group]
    challenges: [Challenge]
    challenge(id: ID!): Challenge
    categories: [Category]
    category(id: ID!): Category
  }
  type Group {
    id: ID!
    name: String!
    count: Int!
  }
  type Challenge {
    id: ID!
    title: String!
    description: String!
    overview: String!
    rules: String!
  }
  type Category {
    id: ID!
    title: String!
    description: String!
  }
  type Mutation {
    updateChallenge(
      title: String!
      description: String!
      overview: String!
      rules: String!
    ): Challenge
    deleteChallenge(id: ID!): ID!
  }
`;

module.exports = makeExecutableSchema({
  typeDefs: schema,
  resolvers
});
