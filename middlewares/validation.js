const { celebrate, Joi } = require('celebrate');
const { urlRegex } = require('../config');

module.exports.registrationValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(30),
    avatar: Joi.string().regex(urlRegex),
    email: Joi.string().required().email(),
    password: Joi.string().required().min(2).max(30)
  })
});

module.exports.loginValidation = celebrate({
  body: Joi.object({
    email:Joi.string().required().email(),
    password: Joi.string().required().min(6).max(30)
  })
});

module.exports.getUserByIdValidation = celebrate({
  params: Joi.object({
    _id: Joi.string().length(24).hex().required()
  })
});

module.exports.updateUserInfoValidation = celebrate({
  body: Joi.object({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required()
  })
});

module.exports.updateUserAvatarValidation = celebrate({
  body: Joi.object({
    avatar: Joi.string().regex(urlRegex).required()
  })
});

module.exports.createCardValidation = celebrate({
  body: Joi.object({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().regex(urlRegex),
  })
});

module.exports.deleteCardValidation = celebrate({
  params: Joi.object({
    _id: Joi.string().length(24).hex().required()
  })
});

module.exports.likeCardValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required()
  })
});

module.exports.dislikeCardValidation = celebrate({
  params: Joi.object({
    cardId: Joi.string().length(24).hex().required()
  })
});