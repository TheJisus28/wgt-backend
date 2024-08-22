import { db } from "../../../database/connection.database.js";

// Create a new user
const createUser = async ({ username, email, password }) => {
  const query = `
    INSERT INTO users (username, email, password)
    VALUES ($1, $2, $3)
    RETURNING *;
  `;
  const values = [username, email, password];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Get all users
const getAllUsers = async () => {
  const query = `
    SELECT u.user_id, u.username, u.email, u.role_id 
    FROM users u;
  `;
  const result = await db.query(query);
  return result.rows;
};

// Get a user by ID
const getUserById = async (user_id) => {
  const query = `
    SELECT u.user_id, u.username, u.email, u.role_id, u.password 
    FROM users u
    WHERE u.user_id = $1;
  `;
  const values = [user_id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Get a user by email
const getUserByEmail = async (email) => {
  const query = `
    SELECT u.user_id, u.username, u.email, u.role_id, u.password  
    FROM users u
    WHERE u.email = $1;
  `;
  const values = [email];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Update a user's username
const updateUsername = async (user_id, newUsername) => {
  const query = `
    UPDATE users 
    SET username = $1 
    WHERE user_id = $2 
    RETURNING *;
  `;
  const values = [newUsername, user_id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Update a user's email
const updateEmail = async (user_id, newEmail) => {
  const query = `
    UPDATE users 
    SET email = $1 
    WHERE user_id = $2 
    RETURNING *;
  `;
  const values = [newEmail, user_id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Update a user's password
const updatePassword = async (user_id, newPassword) => {
  const query = `
    UPDATE users 
    SET password = $1 
    WHERE user_id = $2 
    RETURNING *;
  `;
  const values = [newPassword, user_id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Update a user's role_id
const updateRoleId = async (user_id, newRoleId) => {
  const query = `
    UPDATE users 
    SET role_id = $1 
    WHERE user_id = $2 
    RETURNING *;
  `;
  const values = [newRoleId, user_id];
  const result = await db.query(query, values);
  return result.rows[0];
};

// Delete a user
const deleteUser = async (user_id) => {
  const query = `
    DELETE FROM users
    WHERE user_id = $1
    RETURNING *;
  `;
  const values = [user_id];
  const result = await db.query(query, values);
  return result.rows[0];
};

export const userRepository = {
  createUser,
  getAllUsers,
  getUserById,
  getUserByEmail,
  updateUsername,
  updateEmail,
  updatePassword,
  updateRoleId,
  deleteUser,
};
