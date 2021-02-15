const express = require("express");
const authController = require("../controllers/authController");
const customerController = require("../controllers/customerController");
const Customer = require("../models/customerModel");

const { check, validationResult } = require("express-validator");
const catchAsync = require("../utils/catchAsync");

const router = express.Router();

//Protect all routes after this middleware
router.use(authController.protect);

//Restrict all router after this middleware to admin only
router.use(authController.restrictTo("admin"));

router.route("/").get(customerController.getAllCustomers);

router.post(
  "/",
  catchAsync(async (req, res, next) => {
    const { cCode, name, address, contactPerson, email, phone } = req.body;

    try {
      cs = new Customer({
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
  .get(customerController.getCustomer)
  .patch(customerController.updateCustomer)
  .delete(
    authController.restrictTo("admin"),
    customerController.deleteCustomer
  );

module.exports = router;
