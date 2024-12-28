const jwt = require("jsonwebtoken");
const isValidUser = async (req, res, next) => {
  try {
    let token = req.headers["authorization"].split(" ")[1];

    if (!token) {
      res.status(400).json({ status: 0, msg: "Token not provided" });
    }
    jwt.verify(token, process.env.jwtSecret);
    next();
  } catch (err) {
    return res.status(400).json({ status: 0, msg: "Session expired" });
  }
};
module.exports = {
  isValidUser,
};
