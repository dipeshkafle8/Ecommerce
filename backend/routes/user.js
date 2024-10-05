const express = require("express");
const userRouter = new express.Router();

const { handelUserLogin , handelUserRegister } = require("../controller/user");

userRouter.post("/login", handelUserLogin);
userRouter.post('/register',handelUserRegister);
module.exports = {
  userRouter,
};
