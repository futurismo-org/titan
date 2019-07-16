import express from 'express';
import { functions } from './utils/admin';

const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors({ origin: true }));

const { chargeProduct, validCoupon } = require('./handlers/stripe');
const { postTweet } = require('./handlers/twitter');
const { dashboard, topic, challenge } = require('./handlers/ogp');

// const user = require('./user');
// const authNewUser = functions.auth.user().onCreate(user.createUser);

// stripe
app.post('/charges', chargeProduct);
app.post('/coupons/valid', validCoupon);

app.post('/twitter/post', postTweet);

app.get('/c/:cid/u/:uid', dashboard);
app.get('/c/:cid/t/:tid', topic);
app.get('/cat/:cid/t/:tid', topic);

app.get('/c/:cid/overview', challenge);

// register endpoints
exports.api = functions.https.onRequest(app);
