import { Router } from "express"; // Importing the Router from Express to create a new router instance
import { validateDTO } from "../middlewares/dto.middleware.js"; // Importing the middleware for validating Data Transfer Objects (DTOs)
import { verifyToken } from "../middlewares/jwt.middleware.js"; // Importing the middleware for verifying JWT tokens
import { loginUserSchema, registerUserSchema } from "../DTOs/user.dto.js"; // Importing the schemas for user login and registration validation
import { userController } from "../controllers/user.controller.js"; // Importing the user controller for handling user-related operations

const router = Router(); // Creating a new router instance

// Defining routes for user registration, login, and fetching all users
router
  // Route for user registration, validating the request body against the registerUserSchema
  .post(
    "/register",
    validateDTO(registerUserSchema),
    userController.registerUser
  )

  // Route for user login, validating the request body against the loginUserSchema
  .post("/login", validateDTO(loginUserSchema), userController.loginUser)

  // Route to get all users, protected by JWT verification middleware
  .get("/", verifyToken, userController.getAllUsers);

// Exporting the router to be used in other parts of the application
export default router;
