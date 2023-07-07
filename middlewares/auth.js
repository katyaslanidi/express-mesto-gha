const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const secretKey = process.env.SECRET_KEY;
module.exports = secretKey;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  let payload;
  try {
    payload = jwt.verify(token, "YOUR_SECRET_KEY");
  } catch (err) {
    next(err);
  }
  req.user = payload;
  next();
};