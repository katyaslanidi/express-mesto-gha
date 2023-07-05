const mongoose = require('mongoose');
const Card = require('../models/card');
const { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, FORBIDDEN_ERROR, CONFLICT_ERROR, UNAUTHORIZED_ERROR } = require('../utils/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  const { name, link } = req.body;
  const owner = req.user._id;
  Card.create({ name, link, owner })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BAD_REQUEST('Переданы некорректные данные'))
      } else next(err);
    })
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NOT_FOUND('Пользователь не найден'));
      }
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne({ _id: req.params.cardId})
          .then(res.send(card))
          .catch(() => {
            return res.status(INTERNAL_SERVER_ERROR.error_code).send({ message: INTERNAL_SERVER_ERROR.message });
          })
      } else {
        return next(new FORBIDDEN_ERROR('Это карточка другого пользователя'));
      }
    })
    .catch(next);
};

module.exports.likeCard = (req, res, next) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } },
    { new: true },)
    .then((card) => {
      if (!card) {
        return next(new NOT_FOUND('Пользователь не найден'));
      }
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BAD_REQUEST('Переданы некорректные данные'))
      } else next(err);
    })
};

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } },
    { new: true },)
    .then((card) => {
      if (!card) {
        return next(new NOT_FOUND('Пользователь не найден'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BAD_REQUEST('Переданы некорректные данные'))
      } else next(err);
    })
};