const firebase = require('firebase');

let config: any;
if (process.env.development) {
  config = require('./config');
} else {
  config = require('./config.prod');
}
if (!firebase.app.length) firebase.initializeApp(config);

module.exports = { firebase };
