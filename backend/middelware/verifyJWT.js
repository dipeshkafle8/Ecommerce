require("dotenv").config({ path: "../.env" });
const jwt = require("jsonwebtoken");
const { userModel } = require("../model/UserModel");
// this is the middelware
const isAdmin = async (req, res, next) => {
  try {
    const encryptedToken = req.headers.authorization.split(" ")[1];

    const decryptedToken = jwt.verify(encryptedToken, process.env.jwtSecret);

    const user = await userModel.findById({ _id: decryptedToken.id });
    if (user.role == "admin") {
      next();
    } else
      return res.status(404).json({
        message: "You are not allowed to visit this route",
        status: 0,
      });
  } catch (error) {
    if (error instanceof jwt.JsonWebTokenError) {
      return res.status(402).json({
        message: "Json web token verfication failed",
        status: 0,
      });
    }
    res.status(500).json({
      message: "Internal server error",
      status: 0,
    });
  }
};

module.exports = {
  isAdmin,
};
