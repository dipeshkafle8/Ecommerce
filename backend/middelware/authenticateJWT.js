const jwt = require("jsonwebtoken");
const AuthenticatedUser = async (req, res, next) => {
  let token = req.headers["authorization"].split(" ")[1];
  console.log(token);
  console.log(req.body);
  next();
};
module.exports = {
  AuthenticatedUser,
};
