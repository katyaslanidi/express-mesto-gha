const express = require('express');
const mongoose = require('mongoose');
// const cookie = require("cookie-parser")

const { errors } = require('celebrate');
const errorHandler = require('./errors/errorHandler');
const auth = require('./middlewares/auth');
// const cardsRoutes = require('./routes/cards');
// const usersRoutes = require('./routes/users');
const router = require('./routes');
// const { NotFound } = require('./errors/errors');

const app = express();

const { PORT = 3000 } = process.env;

// mongoose.set('strictQuery', true);
mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// app.use(cookie());
app.use(auth);
app.use(router);
// app.use((req, res, next) => next(new NotFound('Страницы по данному url не существует')));
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});
