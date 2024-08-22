import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../../config/config.js";
import { ValidationError, ConflictError } from "../errors/custom.errors.js";
import { userRepository } from "../repository/user.repository.js";

const registerUser = async ({ username, email, password }) => {
  // Check if the email already exists
  const existingUser = await userRepository.getUserByEmail(email);
  if (existingUser) {
    throw new ConflictError("Email is already in use");
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = await userRepository.createUser({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign(
    { user_id: newUser.user_id, role_id: newUser.role_id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

const loginUser = async ({ email, password }) => {
  const user = await userRepository.getUserByEmail(email);
  if (!user || !(await bcrypt.compare(password, user.password))) {
    throw new ValidationError("Invalid email or password");
  }

  const token = jwt.sign(
    { user_id: user.user_id, role_id: user.role_id },
    JWT_SECRET,
    { expiresIn: "1h" }
  );

  return token;
};

const getAllUsers = async () => {
  const users = await userRepository.getAllUsers();
  return { ok: true, users };
};

export const userService = {
  registerUser,
  loginUser,
  getAllUsers,
};
