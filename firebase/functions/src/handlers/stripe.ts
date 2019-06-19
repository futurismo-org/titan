const stripe = require('stripe')(process.env.STRIPE_SEC_KEY);

exports.chargeProduct = (req: any, res: any) => {
  stripe.charges
    .create({
      amount: 300,
      currency: 'jpy',
      description: 'Challenge Charge',
      source: req.body.body
    })
    .then((status: any) => res.json(status))
    .catch((err: any) => res.status(500).json(err));
};
