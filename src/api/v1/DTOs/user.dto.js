import Joi from "joi"; // We will use Joi for schema validation

// Define a validation schema for user registration
export const registerUserSchema = Joi.object({
  username: Joi.string().min(3).max(50).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});

// Define a validation schema for login
export const loginUserSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(3).required(),
});
