const Customer = require("../models/customerModel");
const factory = require("./handlerFactory");
// const APIFeatures = require("../utils/apiFeatures");

exports.getAllCustomers = factory.getAll(Customer);
exports.getCustomer = factory.getOne(Customer);
exports.updateCustomer = factory.updateOne(Customer);
exports.deleteCustomer = factory.deleteOne(Customer);
