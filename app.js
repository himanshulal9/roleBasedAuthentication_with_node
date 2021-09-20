const express = require("express");
const createHttpErrors = require("http-errors");
const morgan = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 4000;
require("dotenv").config();

const app = express();

app.use(morgan("dev"));

//defining Routes
app.get("/", (req, res, next) => {
  res.send("working");
});

//error handling in the requests
app.use((req, res, next) => {
  next(createHttpErrors.NotFound());
});

app.use((req, res, next) => {
  error.status = error.status || 500;
  res.status(error.status);
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
