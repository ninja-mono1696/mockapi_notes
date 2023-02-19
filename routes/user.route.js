const express = require("express");
const { userRegister, userLogin } = require("../controllers/user.controller");

const userRouter = express.Router();

userRouter.post("/register", userRegister);
userRouter.post("/login", userLogin);

module.exports = { userRouter };
