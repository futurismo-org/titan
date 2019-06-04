import firebase from 'firebase/app';

import 'firebase/auth';
import 'firebase/firestore';

let config;
if (process.env.development) {
  config = require('./config');
} else {
  config = require('./config.prod');
}

firebase.initializeApp(config);

export default firebase;
