const mongoose = require('mongoose');

const SettingSchema = new mongoose.Schema({
  settingKey: { type: String, required: true },
  settingValue: { type: Object },
});

module.exports = mongoose.model('Setting', SettingSchema);
