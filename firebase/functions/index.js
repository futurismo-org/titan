const functions = require('firebase-functions');
const setupGraphQLServer = require('./graphql/server');

const graphQLServer = setupGraphQLServer();
require('./utils/auth');

exports.api = functions
  .region('asia-northeast1')
  .https.onRequest(graphQLServer);
