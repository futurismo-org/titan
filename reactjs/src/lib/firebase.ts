const firebase = require('firebase');
const config = require('./config');

if (!firebase.apps.length) firebase.initializeApp(config);

export default firebase;
