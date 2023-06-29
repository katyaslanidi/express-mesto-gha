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
      if (err.name === 'CastError') {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};

module.exports.createUser = (req, res) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};

module.exports.updateUserInfo = (req, res) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      } else {
        res.send(user);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};

module.exports.updateUserAvatar = (req, res) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
    .then((newAvatar) => {
      if (!newAvatar) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      } else {
        res.send(newAvatar);
      }
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};