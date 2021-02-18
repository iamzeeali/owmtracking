const CCustomer = require("../models/cCustomerModel");
const factory = require("./handlerFactory");
// const APIFeatures = require("../utils/apiFeatures");

exports.getAllCCustomers = factory.getAll(CCustomer);
exports.getCCustomer = factory.getOne(CCustomer);
exports.updateCCustomer = factory.updateOne(CCustomer);
exports.deleteCCustomer = factory.deleteOne(CCustomer);
