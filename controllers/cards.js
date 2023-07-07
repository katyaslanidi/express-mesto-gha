const mongoose = require('mongoose');
const Card = require('../models/card');
const { BadRequest, NotFound, InternalServerError, ForbiddenError } = require('../errors/errors');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
};

module.exports.createCard = (req, res, next) => {
  // const { name, link } = req.body;
  // const owner = req.user._id;
  Card.create({
    name: req.body.name,
    link: req.body.link,
    owner: req.user._id
  })
    .then((card) => res.status(201).send(card))
    .catch((err) => {
      if (err instanceof mongoose.Error.ValidationError) {
        return next(new BadRequest('Переданы некорректные данные'))
      } else next(err);
    })
};

module.exports.deleteCard = (req, res, next) => {
  const { _id: cardId } = req.params;
  const userId = req.user._id;
  Card.findById({ _id: cardId })
    .then((card) => {
      if (!card) {
        return next(new NotFound('Пользователь не найден'));
      }
      const { owner: cardOwnerId } = card;
      if (cardOwnerId.valueOf() !== userId) {
        return next(new ForbiddenError('Это карточка другого пользователя'));
      }
      return Card.findByIdAndDelete(cardId);
      //   if (card.owner.toString() === req.user._id) {
      //     Card.deleteOne({ _id: req.params.cardId })
      //       .then(res.send(card))
      //       .catch(() => {
      //         return res.status(InternalServerError.error_code).send({ message: InternalServerError.message });
      //       })
      //   } else {
      //     return next(new ForbiddenError('Это карточка другого пользователя'));
      //   }
    })
    .then((deletedCard) => {
      if (!deletedCard) {
        return next(new NotFound('Карточка уже удалена'));
      }
      res.send({ data: deletedCard });
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
      res.status(200).send(card);
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