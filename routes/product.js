const router = require('express').Router();
const Product = require('../models/Product');

router.get('/', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', async (req, res) => {
  const {
    title,
    description,
    covers,
    premium,
    sumInsured,
    sumInsuredRemark,
    fixedPremium,
    active,
    intro,
    creator,
  } = req.body;
  try {
    const product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        premium,
        sumInsured,
        sumInsuredRemark,
        fixedPremium,
        covers,
        active,
        intro,
        creator,
      },
      { new: true }
    );
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add product
router.post('/', async (req, res) => {
  const newProduct = new Product({
    productCode: req.body.productCode,
    title: req.body.title,
    description: req.body.description,
    sumInsured: req.body.sumInsured,
    sumInsuredRemark: req.body.sumInsuredRemark,
    currency: req.body.currency,
    premium: req.body.premium,
    fixedPremium: req.body.fixedPremium,
    active: req.body.active,
    category: req.body.category,
    unit: req.body.unit,
    remark: req.body.remark,
    covers: req.body.covers,
    image: req.body.image || '',
    intro: req.body.intro || '',
    creator: req.body.creator,
  });

  try {
    const product = await newProduct.save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const prod = await Product.findByIdAndDelete(req.params.id);
    if (!prod) return res.status(404).send();
    return res.send(prod);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
