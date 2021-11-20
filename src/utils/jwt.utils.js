const jwt = require("jsonwebtoken");

exports.generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.SECRETA, {expiresIn: '8h'});
  return token;
}