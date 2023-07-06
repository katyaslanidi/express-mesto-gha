class BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};

class NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};

class INTERNAL_SERVER_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
};

class CONFLICT_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};

class UNAUTHORIZED_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};

class FORBIDDEN_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};

module.exports = { BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, CONFLICT_ERROR, UNAUTHORIZED_ERROR, FORBIDDEN_ERROR };