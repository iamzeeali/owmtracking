const express = require("express");
const authController = require("../controllers/authController");
const cCustomerController = require("../controllers/cCustomerController");
const CCustomer = require("../models/cCustomerModel");

const catchAsync = require("../utils/catchAsync");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));

router.route("/").get(cCustomerController.getAllCCustomers);

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const { cCode, name, address, contactPerson, email, phone } = req.body;

    try {
      cs = new CCustomer({
        cCode,
        name,
        address,
        contactPerson,
        email,
        phone,
        user: req.user.id,
      });

      let CUSTOMER = await cs.save();
      res.json(CUSTOMER);
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
    next();
  })
);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));
router
  .route("/:id")
  .get(cCustomerController.getCCustomer)
  .patch(cCustomerController.updateCCustomer)
  .delete(
    authController.restrictTo("customer"),
    cCustomerController.deleteCCustomer
  );

module.exports = router;
