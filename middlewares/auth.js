const jwt = require('jsonwebtoken');
const { UnauthorizedError, ForbiddenError } = require('../errors/errors');

const secretKey = process.env.SECRET_KEY || 'some-secret-key';
module.exports = secretKey;

module.exports = (req, res, next) => {
  // const { authorization } = req.header;
  // if (!authorization || !authorization.startsWith('Bearer')) {
  //   return next(new UnauthorizedError('Необходима авторизация'));
  //}

  const token = req.cookies.jwt;
  if (!token) {
    return next(new ForbiddenError('Доступ к запрошенному ресурсу запрещен'));
  }
  try {
    const payload = jwt.verify(token, secretKey);
    req.user = payload;
    return next();
  } catch {
    return next(new ForbiddenError('Доступ к запрошенному ресурсу запрещен'));
  }
  // let payload;

  // try {
  //   payload = jwt.verify(token, secretKey);
  // } catch (err) {
  //   return next(new UnauthorizedError('Необходима авторизация'));
  // }
  // req.user = payload;
  // return next();
};