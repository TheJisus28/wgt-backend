/**
 * CustomError class extends the built-in Error class for custom error types.
 */
export class CustomError extends Error {
  /**
   * @param {string} message - The error message.
   * @param {number} statusCode - The HTTP status code associated with the error.
   */
  constructor(message, statusCode) {
    super(message); // Call the parent constructor with the error message
    this.statusCode = statusCode; // Set the status code
    Error.captureStackTrace(this, this.constructor); // Capture stack trace
  }

  /**
   * Override toString to provide a custom string representation of the error.
   * @returns {string} The formatted error message and location.
   */
  toString() {
    return `${this.message} (at ${this.stack.split("\n")[1].trim()})`; // Show message and location
  }
}

/**
 * ValidationError class for validation-specific errors.
 */
export class ValidationError extends CustomError {
  /**
   * @param {string} [message="Validation Error"] - The error message.
   */
  constructor(message = "Validation Error") {
    super(message, 400); // Default message and status code 400
  }
  // Use this error when user input fails validation (e.g., missing required fields).
}

/**
 * BadRequestError class for general bad request errors.
 */
export class BadRequestError extends CustomError {
  /**
   * @param {string} [message="Bad Request"] - The error message.
   */
  constructor(message = "Bad Request") {
    super(message, 400); // Default message and status code 400
  }
  // Use this error for malformed requests or incorrect parameters.
}

/**
 * UnauthorizedError class for unauthorized access errors.
 */
export class UnauthorizedError extends CustomError {
  /**
   * @param {string} [message="Unauthorized"] - The error message.
   */
  constructor(message = "Unauthorized") {
    super(message, 401); // Default message and status code 401
  }
  // Use this error when a user tries to access a resource without proper authentication.
}

/**
 * NotFoundError class for not found errors.
 */
export class NotFoundError extends CustomError {
  /**
   * @param {string} [message="Not Found"] - The error message.
   */
  constructor(message = "Not Found") {
    super(message, 404); // Default message and status code 404
  }
  // Use this error when a requested resource cannot be found (e.g., invalid ID).
}

/**
 * ConflictError class for conflict errors, typically for existing resources.
 */
export class ConflictError extends CustomError {
  /**
   * @param {string} [message="Conflict: Resource already exists"] - The error message.
   */
  constructor(message = "Conflict: Resource already exists") {
    super(message, 409); // Default message and status code 409
  }
  // Use this error when trying to create a resource that already exists (e.g., duplicate username).
}
