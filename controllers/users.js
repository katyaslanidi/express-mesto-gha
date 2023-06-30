const mongoose = require('mongoose');
const User = require('../models/user');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

module.exports.getUsers = (req, res) => {
  User.find({})
    .then((users) => res.send({ users }))
    .catch(() => {
      return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
    })
};

module.exports.getUserById = (req, res) => {
  const { _id } = req.params;
  User.findById({_id})
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      }
      res.send({user});
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
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.status(201).send(user))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};

const updateUserData = (data, req, res) => {
  User.findByIdAndUpdate(req.user._id, data, { new: true, runValidators: true })
    .then((newData) => {
      if(!newData) {
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