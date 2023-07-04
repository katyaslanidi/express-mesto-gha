const express = require('express');
const mongoose = require('mongoose');
const router = require('./routes');
const auth = require('./middlewares/auth');
const { login, createUser } = require('./controllers/users');
// const login = require('./routes/users');
// const createUser = require('./routes/users');

const app = express();

const { PORT = 3000 } = process.env;

mongoose.connect('mongodb://localhost:27017/mestodb');

app.listen(PORT, () => {
  console.log(`Сервер запущен, PORT = ${PORT}`);
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.post('/signin', login);
app.post('/signup', createUser);
app.use(auth);

app.use(router);