import { CustomError } from "../errors/custom.errors.js";

export const errorHandler = (err, req, res, next) => {
  // Check if the error is an instance of CustomError
  if (!(err instanceof CustomError)) {
    console.error(err); // Log only non-CustomErrors in console
  }

  // Use the statusCode from the error or default to 500
  const statusCode = err.statusCode || 500;

  // Default message for the response
  let message = "Internal Server Error. Please try again later.";

  // If it's a custom error, use its message
  if (err instanceof CustomError) {
    message = err.message;
  }

  // Respond with the error message without any database details
  res.status(statusCode).json({
    ok: false,
    message,
  });
};
