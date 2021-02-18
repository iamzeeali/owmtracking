const mongoose = require("mongoose");
const validator = require("validator");

const cCustomerSchema = new mongoose.Schema({
  cCustomerCode: {
    type: String,
    required: [true, "Please enter customer code"],
    unique: true,
  },
  name: {
    type: String,
    required: [true, "Please enter customer name"],
  },
  address: {
    type: String,
  },
  contactPerson: {
    type: String,
  },
  email: {
    type: String,
    lowercase: true,
    validate: [validator.isEmail, "Please provide a valid email"],
  },
  phone: {
    type: Number,
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

cCustomerSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});

module.exports = CCUSTOMER = mongoose.model("CCUSTOMER", cCustomerSchema);
