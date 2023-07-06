const mongoose = require('mongoose');
const Card = require('../models/card');
const { BadRequest, NotFound, InternalServerError, ForbiddenError } = require('../errors/errors');

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
        return next(new BadRequest('Переданы некорректные данные'))
      } else next(err);
    })
};

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params.cardId)
    .then((card) => {
      if (!card) {
        return next(new NotFound('Пользователь не найден'));
      }
      if (card.owner.toString() === req.user._id) {
        Card.deleteOne({ _id: req.params.cardId})
          .then(res.send(card))
          .catch(() => {
            return res.status(InternalServerError.error_code).send({ message: InternalServerError.message });
          })
      } else {
        return next(new ForbiddenError('Это карточка другого пользователя'));
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
        return next(new NotFound('Пользователь не найден'));
      }
      res.status(201).send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'))
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
        return next(new NotFound('Пользователь не найден'));
      }
      res.send(card);
    })
    .catch((err) => {
      if (err instanceof mongoose.Error.CastError) {
        return next(new BadRequest('Переданы некорректные данные'))
      } else next(err);
    })
};