const router = require('express').Router();
const Sale = require('../models/Sale');

router.get('/', async (req, res) => {
  try {
    const sales = await Sale.find();
    res.status(200).json(sales);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/add', async (req, res) => {
  const newSale = new Sale({
    productCode: req.body.productCode,
    policyNumber: req.body.policyNumber,
    title: req.body.title,
    insuredName: req.body.insuredName,
    dateOfBirth: req.body.dateOfBirth,
    nationality: req.body.nationality,
    address: req.body.address,
    telephone: req.body.telephone,
    email: req.body.email,
    beneficiary: req.body.beneficiary,
    issuanceDate: req.body.issuanceDate,
    effectiveDate: req.body.effectiveDate,
    duration: req.body.duration,
    expiryDate: req.body.expiryDate,
    currency: req.body.currency,
    premium: req.body.premium,
    sumInsured: req.body.sumInsured,
    policyRider: req.body.policyRider,
    exclusion: req.body.exclusion,
    intro: req.body.intro,
    orderId: req.body.orderId,
    source: req.body.source,
  });

  try {
    const sale = await newSale.save();
    res.status(201).json(sale);
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
