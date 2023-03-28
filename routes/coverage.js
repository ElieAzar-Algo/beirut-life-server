const router = require('express').Router();
const Coverage = require('../models/Coverage');
const verifyToken = require('../middleware/verifyToken')

router.get('/', async (req, res) => {
  try {
    const coverages = await Coverage.find();
    res.status(200).json(coverages);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const coverage = await Coverage.findById(req.params.id);
    res.status(200).json(coverage);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.put('/:id', verifyToken, async (req, res) => {
  const { productCode, description, minAge, sumInsuredMultiplier } = req.body;
  try {
    const coverage = await Coverage.findByIdAndUpdate(
      req.params.id,
      {
        productCode,
        description,
        minAge,
        sumInsuredMultiplier,
      },
      { new: true }
    );
    res.status(200).json(coverage);
  } catch (error) {
    res.status(500).json(error);
  }
});

// Add Coverage
router.post('/',verifyToken, async (req, res) => {
  const newCoverage = new Coverage({
    productCode: req.body.productCode,
    description: req.body.description,
    minAge: req.body.minAge,
    sumInsuredMultiplier: req.body.sumInsuredMultiplier,
  });

  try {
    const coverage = await newCoverage.save();
    res.status(201).json(coverage);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.delete('/:id', verifyToken, async (req, res) => {
  try {
    const cover = await Coverage.findByIdAndDelete(req.params.id);
    if (!cover) return res.status(404).send();
    return res.send(cover);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
