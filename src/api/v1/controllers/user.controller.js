// controllers/user.controller.js
import { userService } from "../services/user.service.js";

// Register a new user
const registerUser = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    const token = await userService.registerUser({
      username,
      email,
      password,
    });

    res.status(201).json({
      ok: true,
      message: "User registered successfully",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Login a user
const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = await userService.loginUser({ email, password });

    res.status(200).json({
      ok: true,
      message: "Login successful",
      token,
    });
  } catch (error) {
    next(error);
  }
};

// Get all users
const getAllUsers = async (req, res, next) => {
  try {
    const users = await userService.getAllUsers();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

// Export the user controller
export const userController = {
  registerUser,
  loginUser,
  getAllUsers,
};
