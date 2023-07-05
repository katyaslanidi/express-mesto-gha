const express = require('express');
const mongoose = require('mongoose');

const { errors } = require('celebrate');
const router = require('./routes');
const auth = require('./middlewares/auth');
const authRoutes = require('./routes/auth');
// const { login, registration } = require('./controllers/users');


const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// app.post('/signin', login);
// app.post('/signup', registration);
app.use(authRoutes);
app.use(auth);
app.use(router);
app.use(errors());
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode)
    .send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message
    });
    next();
});

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});