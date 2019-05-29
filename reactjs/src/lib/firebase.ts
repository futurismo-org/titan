import config from './config';

const firebase = require('firebase');

if (!firebase.apps.length) firebase.initializeApp(config);

export default firebase;
