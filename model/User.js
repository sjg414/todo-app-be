const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const userSchema = Schema(
  {
    name: {
      type: String,
      required: true,
    },
    DOB: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userSchema.methods.toJSON = function () {
  const obj = this._doc;
  delete obj.password;

  return obj;
};

//토큰 생성 method
userSchema.methods.generateToken = function () {
  const token = jwt.sign({ _id: this._id }, JWT_SECRET_KEY, {
    expiresIn: "1d",
  }); //{} : 어떤 정보를 가지고 token화 시킬 것인지, JWT_SECRET_KEY : 정보를 어떠한 키를 이용해 토큰화 할 것인지, expiresIn: 유효기간
  return token;
};
const User = mongoose.model("User", userSchema);
module.exports = User;
