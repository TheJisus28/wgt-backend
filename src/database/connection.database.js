import pkg from "pg"; // Importing the pg package for PostgreSQL database interaction

import {
  DB_HOST,
  DB_NAME,
  DB_PASS,
  DB_PORT,
  DB_USER,
} from "../config/db.config.js"; // Importing database connection details from the configuration

const { Pool } = pkg; // Destructuring to get the Pool class from the pg package

// Creating a new Pool instance for managing PostgreSQL connections
export const db = new Pool({
  user: DB_USER, // Database username
  host: DB_HOST, // Database host
  database: DB_NAME, // Database name
  password: DB_PASS, // Database password
  port: DB_PORT, // Database port
});
