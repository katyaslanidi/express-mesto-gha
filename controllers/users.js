const mongoose = require('mongoose');
const User = require('../models/user');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

module.exports.login = (req, res) => {
  const { email, password } = req.body;

  return User.findUserByCredentials(email, password)
    .then(() => {
      User.findOne({ email }).select('+password')
        .then((user) => {
          if (!user) {
            return Promise.reject(new Error('Неправильные почта или пароль'));
          }
          return bcrypt.compare(password, user.password)
            .then((matched) => {
              if (!matched) {
                return Promise.reject(new Error('Неправильные почта или пароль'));
              }
              const token = jwt.sing(
                { _id: user._id },
                'some-secret-key',
                { expiresIn: '7d' }
              );
              return res.cookie('jwt', token, {
                maxAge: 3600000,
                httpOnly: true,
                sameSite: true
              })
              .end();
            })
        })
    })
    .catch((err) => {
      res.status(401).send({ message: err.message });
    })
};

module.exports.getMyUser = (reй, res) => {
  User.findById(req.user._id)
    .then((user) => {
      if(!user) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      }
      res.send(user);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
}

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => {
      return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
    })
};

module.exports.getUserById = (req, res) => {
  const { _id } = req.params;
  User.findById({ _id })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      }
      res.send({ user });
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) =>
      User.create({ name, about, avatar, email, password })
        .then(() => res.status(201).send(
          {
            data: { name, about, avatar, email, password: hash }
          }
        ))
        .catch((err) => {
          if (err instanceof mongoose.Error.ValidationError) {
            return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
          } else {
            return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
          }
        })
    )
};

const updateUserData = (data, req, res) => {
  User.findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .then((newData) => {
      if (!newData) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      } else {
        res.send(newData);
      }
    })
    .catch((err) => {
      if (err instanceof (mongoose.Error.ValidationError || mongoose.Error.CastError)) {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
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