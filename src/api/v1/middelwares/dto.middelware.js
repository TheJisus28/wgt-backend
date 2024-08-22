import { BadRequestError } from "../errors/custom.errors.js";

// Middleware to validate DTOs
export const validateDTO = (schema) => (req, res, next) => {
  const { error } = schema.validate(req.body);

  if (error) {
    return next(new BadRequestError(error.details[0].message));
  } else {
    next();
  }
};
