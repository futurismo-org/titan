const functions = require('firebase-functions');
const setupGraphQLServer = require('./graphql/server');

const user = require('./user');

// End Point for GraphQL
const graphQLServer = setupGraphQLServer();
const api = functions.region('asia-northeast1').https.onRequest(graphQLServer);

// Firebase Auth handlers
const authNewUser = functions.auth.user().onCreate(user.createUser);

module.exports = {
  api,
  authNewUser
};
