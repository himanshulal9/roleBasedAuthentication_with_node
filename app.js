const express = require("express");
const createHttpErrors = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const PORT = process.env.PORT || 4000;
const IndexRouter = require("./routes/index.route");
const AuthRouter = require("./routes/auth.route");
const UserRouter = require("./routes/user.route");
require("dotenv").config();
const session = require("express-session");
const connectFlash = require("connect-flash");

//initialization
const app = express();
app.use(morgan("dev"));
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//init session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      //secure : true,
      httpOnly: true,
    },
  })
);

//all about flash messages
app.use(connectFlash());
app.use((req, res, next) => {
  res.locals.messages = req.flash();
  next();
});

//defining Routes
app.use("/", IndexRouter);
app.use("/auth", AuthRouter);
app.use("/user", UserRouter);

//error handling in the requests
app.use((req, res, next) => {
  next(createHttpErrors.NotFound());
});

app.use((req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
  res.render("error_40x", { error });
  res.send(error);
});

// connectig to mongoDb
mongoose
  .connect(process.env.MONGO_URI, {
    dbName: process.env.DB_NAME,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => app.listen(PORT, () => console.log(`Server Running on ${PORT}`)))
  .catch((err) => {
    console.log("connected to database");
  });
