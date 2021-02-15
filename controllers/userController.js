const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const factory = require("./handlerFactory");
const path = require("path");

const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

exports.getMe = (req, res, next) => {
  req.params.id = req.user.id;
  next();
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // 1) Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This route is not for password updates. Please use /updateMyPassword.",
        400
      )
    );
  }

  // 2) Filtered out unwanted fields names that are not allowed to be updated
  const filteredBody = filterObj(req.body, "name", "email", "photo");

  // 3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: updatedUser,
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined, Please use /signup instead",
  });
};

//Get user's company members only
exports.getMembers = catchAsync(async (req, res, next) => {
  //to allow for nested getReviews on tour (small hack)
  const docs = await User.find({ company: req.user.company.id }).sort({
    date: -1,
  });
  res.status(200).json({
    status: "success",
    result: docs.length,
    data: docs,
  });
});

exports.deleteMember = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: "success",
    data: null,
  });
});

exports.createUser = (req, res) => {
  res.status(500).json({
    status: "error",
    message: "This route is not defined, Please use /signup instead",
  });
};

exports.getAllUsers = factory.getAll(User);
exports.getUser = factory.getOne(User);
//Do not update password with this
exports.updateUser = factory.updateOne(User);
exports.deleteUser = factory.deleteOne(User);

// ******************************************UPLOAD***********************************
exports.upload = catchAsync(async (req, res, next) => {
  const file = req.files.file;
  const filename = Date.now() + file.name;
  const filePath = `/uploads/${filename}`;
  const photo = filePath;

  const updatedUser = await User.findByIdAndUpdate(
    req.user.id,
    { photo },
    {
      new: true,
      runValidators: true,
    }
  );

  if (req.files === null) {
    return res.status(400).json({ msg: "No file uploaded" });
  }

  file.mv(`${__dirname}/../client/public/uploads/${filename}`, (err) => {
    if (err) {
      console.error(err);
      return res.status(500).send(err);
    }

    res.json({
      fileName: filename,
      filePath: filePath,
      status: "success",
      data: {
        user: updatedUser,
      },
    });
  });
});
