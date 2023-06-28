const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR } = require('../utils/errors');

module.exports.getCards = (req, res) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(() => {
      return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
    })
};

module.exports.createCard = (req, res) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send(card))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};

module.exports.deleteCard = (req, res) => {
  Card.findByIdAndDelete(req.params._id)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};

module.exports.likeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },)
    .then((card) => {
      if (!card) {
        return res.status(NOT_FOUND.error_code).send({ message: NOT_FOUND.message });
      }
      res.send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return res.status(BAD_REQUEST.error_code).send({ message: BAD_REQUEST.message });
      } else {
        return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
      }
    })
};