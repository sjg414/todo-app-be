const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const indexRouter = require("./routes/index");
require("dotenv").config();
const MONGODB_URI_PROD = process.env.MONGODB_URI_PROD;

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use("/api", indexRouter); // /api 주소로 요청이 올 경우 indexRouter 사용
const mongoURI = MONGODB_URI_PROD;

//mongoose setting
mongoose
  .connect(mongoURI)
  .then(() => {
    console.log("mongoose connected");
  })
  .catch((err) => {
    console.log("DB connection fail", err);
  });

//express connect
app.listen(process.env.PORT || 4000, () => {
  console.log("server on 4000");
});
