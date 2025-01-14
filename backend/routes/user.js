const express = require("express");
const { userModel } = require("../model/UserModel");
const userRouter = new express.Router();
const { isValidUser } = require("../middelware/authenticateJWT");
const { handelUserLogin, handelUserRegister } = require("../controller/user");
const { isAdmin } = require("../middelware/verifyJWT");

userRouter.post("/login", handelUserLogin);
userRouter.post("/register", handelUserRegister);
userRouter.post("/checkUserSession", isValidUser, async (req, res) => {
  try {
    let user = await userModel.findOne({ email: req.body.email });
    if (!user) {
      return res.status(404).json({ status: 0, msg: "User doesnot exists" });
    }
    res.status(200).json({ status: 1, msg: "Session not expired", user: user });
  } catch (err) {
    res.status(401).json({ status: 0, msg: "Error in searching in db" });
  }
});

userRouter.post("/isAdmin", isAdmin, (req, res) => {
  res.status(200).json({ status: 1, msg: "Yes!! You are admin" });
});
module.exports = {
  userRouter,
};
