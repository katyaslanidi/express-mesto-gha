require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const { PORT, bdUrl } = require('./config');

const errorHandler = require('./errors/errorHandler');
const router = require('./routes');

const app = express();

mongoose.connect(bdUrl);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});
