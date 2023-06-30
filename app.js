const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});

app.use((req, res, next) => {
  req.user = {
    _id: '649ad946a70b943ca8b2f9ae'
  };
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);