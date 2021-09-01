const multer = require("multer");
const express = require("express");
const ASN = require("../models/asnModel");
const asnController = require("../controllers/asnController");

const excelToJson = require("convert-excel-to-json");
const router = express.Router();

global.__basedir = __dirname;

// -> Multer Upload Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, __basedir + "/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// -> Express Upload RestAPIs
router.route("/").post(upload.single("ecciFile"), (req, res) => {
  console.log(req.file.originalname);
  if (req.file && req.file.originalname === "asn_rep22246.xlsx") {
    convertEcciExcelToJson(__basedir + "/uploads/" + req.file.filename);
    res.json({
      msg: "File uploaded/import successfully!",
      file: req.file,
    });
  } else {
    res.status(500).send("Incorrect Document");
  }
});

// -> Import Excel File to MongoDB database
function convertEcciExcelToJson(filePath) {
  // -> Read Excel File to Json Data
  const excelData = excelToJson({
    sourceFile: filePath,
    sheets: [
      {
        // Excel Sheet Name
        name: "Sheet1",

        // Header Row -> be skipped and will not be present at our result object.
        header: {
          rows: 1,
        },

        // Mapping columns to keys
        columnToKey: {
          A: "ecciNumber",
          D: "asnUploadDate",
          I: "vendorCode",
          J: "vendorName",
        },
      },
    ],
  });

  // -> Log Excel Data to Console

  ASN.insertMany(excelData.Sheet1, function (err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Multiple documents inserted to Collection");
    }
  });
}
router.route("/").get(asnController.getAllAsns);
router.route("/create").post(asnController.createAsn);
router.route("/limited").get(asnController.getLimitedAsns);

module.exports = router;
