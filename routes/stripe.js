const router = require('express').Router();
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

router.post('/payment', (req, res) => {
  stripe.charges.create(
    {
      source: req.body.tokenId,
      amount: req.body.amount * 100,
      currency: 'usd',
    },
    (stripeErr, stripeRes) => {
      if (stripeErr) {
        res.status(500).json(stripeErr);
      }
    }
  );
});

router.post('/pay', async (req, res) => {
  try {
    const { amount, name } = req.body;
    if (!amount || !name)
      return res
        .status(400)
        .json({ message: 'Amount and name fields are required' });

    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100, //lowest denomination of particular currency
      currency: 'usd',
      payment_method_types: ['card'], //by default
      metadata: { name },
    });

    const clientSecret = paymentIntent.client_secret;
    res.json({ message: 'Payment initiated', clientSecret, name });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
