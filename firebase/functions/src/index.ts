import express from 'express';
import { functions } from './utils/admin';

require('dotenv').config();

const app = express();

const { chargeProduct, validCoupon } = require('./handlers/stripe');

// const user = require('./user');

// Firebase Auth handlers
// const authNewUser = functions.auth.user().onCreate(user.createUser);

// stripe
app.post('/charges', chargeProduct);
app.post('/coupons/valid', validCoupon);

// register endpoints
exports.api = functions.https.onRequest(app);
