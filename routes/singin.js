const loginRouter = require('express').Router();

const { login } = require('../controllers/users');
const { loginValidation } = require('../middlewares/validation');

loginRouter.post('/signin', loginValidation, login);

module.exports = loginRouter;