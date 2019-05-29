const admin = require('firebase-admin');
const config = require('./utils/config');

admin.initializeApp(config);

const functions = require('firebase-functions').region('asia-northeast1'); // eslint-disable-line
const user = require('./user');

// Firebase Auth handlers
const authNewUser = functions.auth.user().onCreate(user.createUser);

module.exports = {
  authNewUser
};
export {};
