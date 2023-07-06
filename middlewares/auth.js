const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');

const secretKey = process.env.SECRET_KEY || 'some-secret-key';
module.exports = secretKey;

module.exports = (req, res, next) => {
  const { authorization } = req.header;
  if (!authorization || !authorization.startsWith('Bearer')) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }

  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, secretKey);
  } catch (err) {
    return next(new UnauthorizedError('Необходима авторизация'));
  }
  req.user = payload;
  return next();
};