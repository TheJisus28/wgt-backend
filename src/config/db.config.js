import dotenv from "dotenv";
dotenv.config();

export const { DB_USER, DB_HOST, DB_NAME, DB_PASS, DB_PORT } = process.env;
