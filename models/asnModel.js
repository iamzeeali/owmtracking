const mongoose = require("mongoose");

const asnSchema = new mongoose.Schema({
  ecciNumber: {
    type: String,
  },
  asnUploadDate: {
    type: String,
  },
  vendorCode: {
    type: String,
  },
  vendorName: {
    type: String,
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

asnSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = ASN = mongoose.model("ASN", asnSchema);
