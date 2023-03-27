const router = require('express').Router();
const Setting = require('../models/Setting');

router.post('/add', async (req, res) => {
  const newSetting = new Setting({
    settingKey: req.body.settingKey,
    settingValue: req.body.settingValue,
  });

  try {
    const setting = await newSetting.save();
    res.status(201).json(setting);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.post('/getSeq', async (req, res) => {
  const query = { settingKey: 'policySeq' };
  const newSeq = await Setting.findOneAndUpdate(
    query,
    {
      $inc: { 'settingValue.intValue': 1 },
    },
    { new: false } // returns the value before incrementing
  );

  try {
    res.status(200).json(newSeq.settingValue);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
