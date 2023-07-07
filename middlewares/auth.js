const jwt = require('jsonwebtoken');
const { UnauthorizedError } = require('../errors/errors');
const { NODE_ENV, JWT_SECRET } = process.env;

// const secretKey = process.env.SECRET_KEY;
// module.exports = secretKey;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const bearer = 'Bearer ';
  if (!authorization || !authorization.startsWith(bearer)) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  const token = authorization.replace(bearer, '');
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret');
  } catch (err) {
    return next(new UnauthorizedError('Неправильные почта или пароль'));
  }
  req.user = payload;
  return next();
};
// const token = req.cookies.jwt;
// if (!token) {
//   return next(new UnauthorizedError('Необходима авторизация'));
// }
// let payload;
// try {
//   payload = jwt.verify(token, "YOUR_SECRET_KEY");
// } catch (err) {
//   next(err);
// }
// req.user = payload;
// next();

// module.exports = { auth };