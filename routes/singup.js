const registrationRouter = require('express').Router();

const { registration } = require('../controllers/users');
const { registrationValidation } = require('../middlewares/validation');

registrationRouter.post('/singup', registrationValidation, registration);

module.exports = registrationRouter;