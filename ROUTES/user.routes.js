const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { Usermodel } = require("../MODEL/user.model");
const userRoutes = express.Router();

userRoutes.post("/register", async (req, res) => {
  const { mobile, name, email, gender, pass, age } = req.body;
  try {
    bcrypt.hash(pass, 10, async (err, hash) => {
      if (err) {
        console.log(err);
      } else {
        const User = Usermodel({
          mobile,
          name,
          email,
          gender,
          pass: hash,
          age,
        });
        await User.save();
        res.send("registered successfully");
      }
    });
  } catch (error) {
    console.log(error);
  }
});

userRoutes.post("/login", async (req, res) => {
  const { email, pass } = req.body;
  try {
    const User = await Usermodel.find({ email });
    if (User.length > 0) {
      bcrypt.compare(pass, User[0].pass, async (err, result) => {
        if (result) {
          const token = jwt.sign({ Id: User[0]._id }, process.env.SECRET);
          res.send({ msg: "Login Successful", token: token });
        } else {
          res.send({ msg: "Invalid Credentials" });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = {
  userRoutes,
};
