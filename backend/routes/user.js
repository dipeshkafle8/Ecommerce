const express = require("express");
const userRouter = new express.Router();
const { AuthenticatedUser } = require("../middelware/authenticateJWT");
const { handelUserLogin, handelUserRegister } = require("../controller/user");

userRouter.post("/login", handelUserLogin);
userRouter.post("/register", handelUserRegister);
userRouter.post("/checkUserSession", AuthenticatedUser, async (req, res) => {
  res.status(200).json({ msg: "Session not expired" });
});
module.exports = {
  userRouter,
};
