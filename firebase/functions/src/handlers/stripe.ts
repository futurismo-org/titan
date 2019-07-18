import Stripe from 'stripe';

const functions = require('firebase-functions');

const stripe =
  process.env.APP_ENV === 'development'
    ? new Stripe(process.env.STRIPE_SEC_KEY as string)
    : new Stripe(functions.config().stripe.secret_token);

exports.chargeProduct = (req: any, res: any) => {
  console.log('charge start');

  stripe.charges
    .create({
      amount: req.body.price,
      currency: 'jpy',
      description: 'チャレンジ参加料',
      source: req.body.tokenId
    })
    .then((status: any) => res.json(status))
    .catch((err: any) => res.status(500).json(err));
};

exports.validCoupon = (req: any, res: any) => {
  stripe.coupons.retrieve(req.body.coupon, (err: any, coupon: any) => {
    if (!coupon) {
      return res.json(err);
    }
    return res.status(200).json(coupon);
  });
};
