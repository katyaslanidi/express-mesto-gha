const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const errorHandler = require('./errors/errorHandler');
// const auth = require('./middlewares/auth');
const router = require('./routes');

const app = express();

app.use(cookieParser());

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors());

// app.use(auth);
app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});
