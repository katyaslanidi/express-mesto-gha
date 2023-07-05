const authRoutes = require('express').Router();

const { registration, login } = require('../controllers/users');
const { registrationValidation, loginValidation } = require('../middlewares/validation');


authRoutes.post('/singup', registrationValidation, registration);
authRoutes.post('/signin', loginValidation, login);

module.exports = authRoutes;