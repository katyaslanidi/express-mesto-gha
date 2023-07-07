const express = require('express');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');

const errorHandler = require('./errors/errorHandler');
const router = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(cookieParser());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(errors());

app.use(router);
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});
