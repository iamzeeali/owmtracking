const Grn = require("../models/grnModel");
const factory = require("./handlerFactory");

exports.getAllGrns = factory.getAll(Grn);
exports.getGrn = factory.getOne(Grn);
exports.updateGrn = factory.updateOne(Grn);
exports.deleteGrn = factory.deleteOne(Grn);
