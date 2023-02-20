const mongoose = require("mongoose");

const USerSchem = mongoose.Schema(
  {
    mobile: Number,
    name: String,
    age: Number,
    gender: String,
    email: String,
    pass: String,
  },
  {
    versionKey: false,
  }
);

const Usermodel = mongoose.model("user", USerSchem);

module.exports = {
  Usermodel,
};
