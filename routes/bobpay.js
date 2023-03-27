const router = require('express').Router();
const axios = require('axios');
const { uid } = require('uid');

const auth = {
  username: process.env.BOBPAY_USERNAME,
  password: process.env.BOBPAY_PASSWORD,
};
const url_username=process.env.BOBPAY_URL_USERNAME

router.post('/', async (req, res) => {
  const hostname = 'test-bobsal.gateway.mastercard.com';
  const path = `/api/rest/version/61/merchant/${url_username}/session`;
  const url = `https://${hostname}${path}`;
  const orderId = uid(8);

  const data = JSON.stringify({
    apiOperation: 'CREATE_CHECKOUT_SESSION',
    order: {
      id: orderId,
      amount: req.body.premium,
      currency: req.body.currency,
      description: req.body.title,
    },
    interaction: {
      operation: 'PURCHASE',
      displayControl: {
        billingAddress: 'HIDE',
        customerEmail: 'HIDE',
        orderSummary: 'SHOW',
        shipping: 'HIDE',
      },
      merchant: {
        name: url_username,
        address: {
          line1: 'Jdeidehh Highway, Le Boulevard Bldg. 10th floor',
          line2: 'P.O.BOX 11-7354 Beirut - Lebanon',
        },
      },
    },
  });

  const options = {
    port: 443,
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Content-Length': data.length,
    },
    auth: auth,
  };
  try {
    const resData = await axios.post(url, data, options);
    res.status(201).json({ ...resData.data, orderId: orderId });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
