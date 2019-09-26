import express from 'express';
import { functions } from './utils/admin';

const cors = require('cors');

require('dotenv').config();

const app = express();
app.use(cors({ origin: true }));

const { chargeProduct, validCoupon } = require('./handlers/stripe');
// const { postTweet, requestToken, accessToken } = require('./handlers/twitter');
const { dashboard, topic, challenge } = require('./handlers/ogp');
const { getToken } = require('./handlers/getstream');
const { createToken } = require('./handlers/firebase');
const { callbackAppleAuth } = require('./handlers/apple');

// stripe
app.post('/charges', chargeProduct);
app.post('/coupons/valid', validCoupon);

// app.post('/twitter/post', postTweet);
// app.post('/twitter/request_token', requestToken);
// app.post('/twitter/access_token', accessToken);

app.get('/c/:cid/u/:uid', dashboard);
app.get('/c/:cid/t/:tid', topic);
app.get('/cat/:cid/t/:tid', topic);
app.get('/topics/:tid', topic);

app.get('/c/:cid/overview', challenge);

// getstream
app.post('/getstream/register', getToken);
app.post('/getstream/token', getToken);

// firebase
app.post('/firebase/create_token', createToken);

// apple
app.get('/apple/callback_auth', callbackAppleAuth);

// register endpoints
exports.api = functions.https.onRequest(app);
