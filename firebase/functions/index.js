const functions = require('firebase-functions');
const setupGraphQLServer = require('./graphql/server');

const graphQLServer = setupGraphQLServer();

exports.api = functions
  .region('asia-northeast1')
  .https.onRequest(graphQLServer);
