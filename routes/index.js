const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NotFound } = require('../errors/errors');

router.use(usersRouter);
router.use(cardsRouter);

router.use((req, res, next) => {
  return next(new NotFound('Такого роута не существует'));
});

module.exports = router;