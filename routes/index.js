const router = require('express').Router();

const registrationRouter = require('./signup');
const loginRouter = require('./signin');
const usersRouter = require('./users');
const cardsRouter = require('./cards');

const auth = require('../middlewares/auth');

const { NotFound } = require('../errors/errors');

router.use('/', registrationRouter);
router.use('/', loginRouter);
router.use(auth);
router.use('/users', usersRouter);
router.use('/cards', cardsRouter);

router.use((req, res, next) => {
  return next(new NotFound('Такого роута не существует'));
});

module.exports = router;