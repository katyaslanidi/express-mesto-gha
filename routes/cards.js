const cardsRoutes = require('express').Router();

const { getCards, createCard, deleteCard, likeCard, dislikeCard } = require('../controllers/cards');
const { createCardValidation, deleteCardValidation, likeCardValidation, dislikeCardValidation } = require('../middlewares/validation');

cardsRoutes.get('/cards', getCards);
cardsRoutes.post('/cards', createCardValidation, createCard);
cardsRoutes.delete('/cards/:cardId', deleteCardValidation, deleteCard);
cardsRoutes.put('/cards/:cardId/likes', likeCardValidation, likeCard);
cardsRoutes.delete('/cards/:cardId/likes', dislikeCardValidation, dislikeCard);

module.exports = cardsRoutes;