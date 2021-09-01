const multer = require("multer");
const express = require("express");
const GRN = require("../models/grnModel");
const grnController = require("../controllers/grnController");
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
router.route("/").post(upload.single("grnFile"), (req, res) => {
  if (req.file && req.file.originalname === "grn_rep22248.xlsx") {
    convertGrnExcelToJson(__basedir + "/uploads/" + req.file.filename);
    res.json({
      msg: "File uploaded/import successfully!",
      file: req.file,
    });
  } else {
    res.status(500).send("Incorrect Document");
  }
});

// -> Import Excel File to MongoDB database
function convertGrnExcelToJson(filePath) {
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
          D: "transactionType",
          E: "modeOfDelivery",
          J: "ecciNumber",
          P: "vendorCode",
          Q: "vendorName",
          S: "inDate",
          AJ: "transDate",
        },
      },
    ],
  });

  GRN.insertMany(excelData.Sheet1, function (err, docs) {
    if (err) {
      return console.error(err);
    } else {
      console.log("Stock Movement Report Inserted");
    }
  });
}

router.route("/").get(grnController.getAllGrns);
router.route("/limited").get(grnController.getLimitedGrns);
router.route("/create").post(grnController.createGrn);

module.exports = router;
