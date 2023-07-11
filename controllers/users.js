const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BadRequest, NotFound, ConflictError, UnauthorizedError } = require('../errors/errors');
const { NODE_ENV, JWT_SECRET } = process.env;

module.exports.registration = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) =>
      User.create({ name, about, avatar, email, password: hash })
        .then(() => {
          // const { _id } = user;
          res.status(201).send(
            {
              data: { name, about, avatar, email }
            }
          );
        }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConflictError('Пользователь с таким email уже существует'));
      } else if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequest('Переданы некорректные данные'))
      } else next(err);
    });

};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        return next(new UnauthorizedError('Неверная почта или пароль'));
      }
      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return next(new UnauthorizedError('Неверная почта или пароль'));
        }
        const token = jwt.sign({ _id: user._id }, NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret', {
          expiresIn: '7d',
        });
        return res.send({ token });
      });
    })
    .catch((err) => next(err));
};


// module.exports.login = (req, res, next) => {
//   const { email, password } = req.body;

//   return User.findUserByCredentials(email, password)
//     .then(({ _id: _id }) => {
//       const token = jwt.sign(
//         { _id },
//         NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret',
//         { expiresIn: '7d' }
//       );
//       return res.send({ token });
//     })
//     .catch((err) => next(err));
// };

module.exports.getMyUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      res.send(user);
    })
    .catch((err) => next(err));
}

module.exports.getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(next);
};

module.exports.getUserById = (req, res) => {
  const { _id } = req.params;
  User.findById({ _id })
    .then((user) => {
      if (!user) {
        return next(new NotFound('Пользователь не найден'));
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'))
      } else next(err);
    })
};

const updateUserData = (data, req, res) => {
  User.findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .then((newData) => {
      if (!newData) {
        return next(new NotFound('Пользователь не найден'));
      } else {
        res.send(newData);
      }
    })
    .catch((err) => {
      if (err instanceof (mongoose.Error.ValidationError)) {
        return next(new BadRequest('Переданы некорректные данные'));
      } else next(err);
    })
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  updateUserData({ name, about }, req, res);
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  updateUserData({ avatar }, req, res);
};