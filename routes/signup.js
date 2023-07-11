const router = require('express').Router();

const { registration } = require('../controllers/users');
const { registrationValidation } = require('../middlewares/validation');

router.post('/signup', registrationValidation, registration);

module.exports = router;