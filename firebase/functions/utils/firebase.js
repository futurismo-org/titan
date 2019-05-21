const firebase = require('firebase');
const config = require('./config');

firebase.initializeApp(config);

module.exports = { firebase };
