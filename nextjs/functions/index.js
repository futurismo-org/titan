/* eslint-disable */
const functions = require('firebase-functions');
const next = require('next');
const routes = require('../routes');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, conf: { distDir: 'next' } });
const handler = routes.getRequestHandler(app);

const nextApp = functions.https.onRequest((request, response) => {
  console.log(`File: ${request.originalUrl}`);
  return app.prepare().then(() => handler(request, response));
});

module.exports = nextApp;
