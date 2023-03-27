const mongoose = require('mongoose');

const ProductSchema = new mongoose.Schema(
  {
    productCode: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    description: { type: String },
    sumInsured: { type: Number, required: true },
    sumInsuredRemark: { type: String },
    currency: { type: String, default: 'usd' },
    premium: { type: Number, required: true },
    fixedPremium: { type: Boolean, default: true },
    active: { type: Boolean, default: true },
    category: { type: String, required: true },
    unit: { type: String },
    remark: { type: String },
    covers: { type: Array },
    image: { type: String },
    intro: { type: String },
    creator: { type: String },
  },
  { timestamps: true }
).set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret) {
    delete ret._id;
  },
});

module.exports = mongoose.model('Product', ProductSchema);
