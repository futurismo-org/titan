const admin = require('firebase-admin');
const config = require('./utils/config');

admin.initializeApp(config);

const functions = require('firebase-functions').region('asia-northeast1'); // eslint-disable-line
const setupGraphQLServer = require('./graphql/server');
const user = require('./user');

// End Point for GraphQL
const graphQLServer = setupGraphQLServer();
const api = functions.https.onRequest(graphQLServer);

// Firebase Auth handlers
const authNewUser = functions.auth.user().onCreate(user.createUser);

module.exports = {
  api,
  authNewUser
};
export {};
