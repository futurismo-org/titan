import Stripe from 'stripe';

const functions = require('firebase-functions');

const stripe =
  process.env.APP_ENV === 'development'
    ? new Stripe(process.env.STRIPE_SEC_KEY as string)
    : new Stripe(functions.config().stripe.secret_token);

exports.chargeProduct = (req: any, res: any) => {
  stripe.charges
    .create({
      amount: req.body.price,
      currency: 'jpy',
      description: 'Challenge Charge',
      source: req.body.tokenId
    })
    .then((status: any) => res.json(status))
    .catch((err: any) => res.status(500).json(err));
};

export default stripe;
