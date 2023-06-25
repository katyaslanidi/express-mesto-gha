const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send(users))
    .catch(next);
}

module.exports.getUserById = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((users) => {
      if (!users[id]) {
        res.send({ error: 'Такого пользователя нет' });
        return;
      }
      res.send(users[id]);
    })
    .catch(err => console.log(err))
    next();
}

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.send(user);
    })
    .catch(err => console.log(err));
}