const Card = require('../models/card');

module.exports.getCards = (req, res, next) => {
  Card.find({})
    .then((cards) => res.send(cards))
    .catch(next);
}

module.exports.createCard = (req, res, next) => {
  const owner = req.user._id;
  const { name, link } = req.body;
  Card.create({ name, link })
    .then((card) => res.send(card))
    .catch(err => console.log(err))
    next();
}

module.exports.deleteCard = (req, res, next) => {
  Card.findByIdAndDelete(req.params._id)
    .then((card) => res.send(card))
    .catch(err => console.log(err))
    next();
}

module.exports.likeCard = (req, res) =>{
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user._id } }, // добавить _id в массив, если его там нет
    { new: true },)
    .then((card) => res.send(card))
    .catch(err => console.log(err))
    next();
}

module.exports.dislikeCard = (req, res) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user._id } }, // убрать _id из массива
    { new: true },)
      .then((card) => res.send(card))
      .catch(err => console.log(err))
      next();
}