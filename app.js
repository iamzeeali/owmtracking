const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controllers/errorController");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const compression = require("compression");
var cors = require("cors");

// ROuter
const userRouter = require("./routes/userRoutes");
const asnRouter = require("./routes/asnRoutes");
const grnRouter = require("./routes/grnRoutes");
const feedbackRouter = require("./routes/feedbackRoutes");

var path = require("path");

const app = express();

// const DB = process.env.DATABASE;
const DB = "mongodb://owmtracking.globushub.com:27017/owmInventory";
// const DB = "mongodb://globushub_zee:XnVD88nh_@103.120.178.168:27017"
// const DB = "mongodb://103.120.178.168:27017/globushub_support-gl";

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB Connected"));

// *********************GLOBAL MIDDLEWARES*******************************

app.use(cors());
//set security http headers
app.use(helmet());

//development logging
if (process.env.NODE_ENV === "development" || process.env.NODE_ENV === "production") {
  app.use(morgan("dev"));
}

//Limit request from same IP
const limiter = rateLimit({
  max: 500,
  windowMs: 60 * 60 * 1000,
  message: "Too many requests from this IP, please try again in an hour!",
});
app.use("/api", limiter);

//body parser, reading data into req.body
app.use(express.json({ limit: "10kb" }));

//Data sanitization against Nosql query injections
app.use(mongoSanitize());

//Data sanitization against XSS(cross site scripting attacks)
app.use(xss());

app.use(compression());

//***************************/ROUTES***********************************

app.use("/api/user", userRouter);
app.use("/api/asn", asnRouter);
app.use("/api/grn", grnRouter);
app.use("/api/feedback", feedbackRouter);

// Serve static assets in production
// Set static folder
// if (process.env.NODE_ENV === "production") {
//   app.use(express.static(path.join(__dirname, "client", "build"s)));

//   app.get("*", (req, res) => {
//     res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
//   });
// }

app.all("*", (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

module.exports = app;
