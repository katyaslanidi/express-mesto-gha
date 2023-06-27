const User = require('../models/user');

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({users}))
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
  console.log(req.user._id);
  const {name, about, avatar} = req.body;
  User.create({name, about, avatar})
    .then((user) => res.send(user))
    .catch(err => console.log(err))
    next();
}

module.exports.updateUserInfo = (req, res, next) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about })
    .then((user) => {
      if (!user) {
        next();
      } else {
        res.send(user);
      }
    })
    .catch(err => console.log(err))
    next();
};

module.exports.updateUserAvatar = (req, res, next) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar })
    .then((newAvatar) => {
      if (!newAvatar) {
        next();
      } else res.send(newAvatar);
    })
    .catch(err => console.log(err))
    next();
};