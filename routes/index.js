const router = require('express').Router();
const usersRouter = require('./users');
const cardsRouter = require('./cards');
const { NOT_FOUND } = require('../utils/errors');

app.use(usersRouter);
app.use(cardsRouter);

router.use((req, res) => {
  return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
});

module.exports = router;