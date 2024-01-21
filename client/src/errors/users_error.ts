type SignupFields = {
  email: string;
  username: string;
  password: string;
};

export class SignupError extends Error {
  fields: SignupFields;

  constructor(fields: SignupFields, message?: string) {
    super(message);
    this.name = this.constructor.name;
    this.fields = fields;
  }
}

class HttpError extends Error {
  constructor(message?: string) {
    super(message);
    this.name = this.constructor.name;
  }
}

/**
 * Status code: 401
 */
export class UnauthorizedError extends HttpError {}

/**
 * Status code: 409
 */
export class ConflictError extends HttpError {}
