const firebase = require('firebase');
const config = require('./config');

if (!firebase.app.length) firebase.initializeApp(config);

module.exports = { firebase };
