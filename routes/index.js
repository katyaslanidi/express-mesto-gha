const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NOT_FOUND } = require('../utils/errors');

router.use(usersRouter);
router.use(cardsRouter);

router.use((req, res, next) => {
  return next(new NOT_FOUND('Такого роута не существует'));
});

module.exports = router;