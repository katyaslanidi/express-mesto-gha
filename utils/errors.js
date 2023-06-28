module.exports.BAD_REQUEST = {
  error_code: 400,
  message: "Произошла ошибка. Переданы некорректные данные."
}

module.exports.NOT_FOUND = {
  error_code: 404,
  message: "Карточка или пользователь не найден."
}

module.exports.INTERNAL_SERVER_ERROR = {
  error_code: 500,
  message: "Ошибка по-умолчанию."
}