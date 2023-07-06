const router = require('express').Router();

const { login } = require('../controllers/users');
const { loginValidation } = require('../middlewares/validation');

router.post('/signin', loginValidation, login);

module.exports = router;