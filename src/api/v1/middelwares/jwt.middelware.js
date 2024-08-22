import jwt from "jsonwebtoken"; // Importing the jsonwebtoken library for handling JWT
import { JWT_SECRET } from "../../../config/config.js"; // Importing the secret used to sign the JWT
import { UnauthorizedError } from "../errors/custom.errors.js"; // Importing custom error class for unauthorized access

// Middleware function to verify JWT tokens
export const verifyToken = (req, res, next) => {
  // Retrieve the token from the Authorization header
  let token = req.headers.authorization;

  // Check if the token is provided
  if (!token) {
    return next(new UnauthorizedError("Token not provided")); // If not, call the next middleware with an UnauthorizedError
  }

  // Extract the token from the "Bearer <token>" format
  token = token.split(" ")[1];

  try {
    // Verify the token using the secret and extract user_id and role_id
    const { user_id, role_id } = jwt.verify(token, JWT_SECRET);
    // Attach user_id and role_id to the request object for further processing
    req.user_id = user_id;
    req.role_id = role_id;
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    // If token verification fails, call the next middleware with an UnauthorizedError
    return next(new UnauthorizedError("Invalid token"));
  }
};
