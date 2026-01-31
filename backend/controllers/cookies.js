require("dotenv").config();
const jwt = require("jsonwebtoken");

const createSecretToken = (id, role, name,ph) => {
  return jwt.sign({ id, role, name,ph }, process.env.TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

module.exports = createSecretToken;
