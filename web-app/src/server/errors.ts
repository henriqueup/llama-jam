export class BadRequestError extends Error {
  constructor(message = "Bad Request") {
    super(message);
    this.name = "BadRequestError";
  }
}

export class UnauthorizedError extends Error {
  constructor(message = "Unauthorized") {
    super(message);
    this.name = "UnauthorizedError";
  }
}