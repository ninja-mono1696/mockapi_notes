const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { UserModel } = require("../models/user.model");

const userRegister = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const data = await UserModel.findOne({ email });
    if (data) {
      res.send({ msg: "User already exists! Please register again" });
    } else {
      bcrypt.hash(password, 5, async (err, hash) => {
        if (err) {
          res.send({ msg: "Something went wrong", error: err });
        } else {
          await UserModel.create({
            name,
            email,
            password: hash,
          });
          res.send({ msg: "Registration Successfull" });
        }
      });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

const userLogin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          res.send({ msg: "Something went wrong", error: err.message });
        } else {
          if (result) {
            const token = jwt.sign(
              {
                userID: user._id,
              },
              process.env.SECRET_KEY,
              { expiresIn: "1h" }
            );
            res.send({ msg: "Login Successfull", token: token });
          } else {
            res.send({ msg: "Wrong Credentials" });
          }
        }
      });
    } else {
      res.send({ msg: "User not found! Please register" });
    }
  } catch (error) {
    res.send({ msg: "Something went wrong", error: error.message });
  }
};

module.exports = { userRegister, userLogin };
