module.exports = class BAD_REQUEST extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 400;
  }
};

module.exports = class NOT_FOUND extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 404;
  }
};

module.exports = class INTERNAL_SERVER_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 500;
  }
};

module.exports = class CONFLICT_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 409;
  }
};

module.exports = class UNAUTHORIZED_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 401;
  }
};

module.exports = class FORBIDDEN_ERROR extends Error {
  constructor(message) {
    super(message);
    this.statusCode = 403;
  }
};