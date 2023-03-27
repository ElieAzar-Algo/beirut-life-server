const mongoose = require('mongoose');

const CoverageSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    description: { type: String },
    minAge: { type: Number },
    sumInsuredMultiplier: { type: Number },
  },
  { timestamps: true }
).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model('Coverage', CoverageSchema);
