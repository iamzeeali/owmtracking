const Asn = require("../models/asnModel");
const factory = require("./handlerFactory");

exports.getAllAsns = factory.getAll(Asn);
exports.getAsn = factory.getOne(Asn);
exports.updateAsn = factory.updateOne(Asn);
exports.deleteAsn = factory.deleteOne(Asn);
