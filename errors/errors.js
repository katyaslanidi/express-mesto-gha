class BadRequest extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};

class InternalServerError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
};

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};

module.exports = { BadRequest, NotFound, InternalServerError, ConflictError, UnauthorizedError, ForbiddenError };