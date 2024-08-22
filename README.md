# Gym Management Backend

## Overview

This project is a gym management backend application built with Node.js, Express, and PostgreSQL. It allows users to register, log in, manage workout routines, and track their progress. The application also implements user roles and custom error handling.

## Features

- **User Registration and Login**: Secure user authentication with hashed passwords and JWT tokens.
- **Routine Management**: Users can create, update, and track their workout routines.
- **Progress Tracking**: Weekly progress tracking for users.
- **Role-based Access Control**: User roles such as admin, user, support, and moderator with specific permissions.
- **Error Handling**: Custom error classes for robust error management.
- **Automated Testing**: Unit tests for controllers, services, and repositories using Mocha, Chai, and Sinon.

## Project Structure

src/
├── api/
│ ├── v1/
│ │ ├── controllers/ # Handles incoming HTTP requests
│ │ ├── DTOs/ # Data Transfer Objects for request validation
│ │ ├── errors/ # Custom error classes
│ │ ├── middlewares/ # Middleware functions
│ │ ├── repository/ # Database interaction logic
│ │ ├── routes/ # API routes definitions
│ │ ├── services/ # Business logic and interaction with repositories
│ │ └── app.js # Express application setup
│ └── v2/ # Future version of the API (placeholder)
│
├── config/ # Configuration files (e.g., database, environment variables)
│ ├── config.js # General configuration
│ └── db.config.js # Database-specific configuration
│
├── database/ # Database setup and connection
│ ├── connection.database.js # Database connection setup
│ └── init.database.sql # SQL script for database initialization
│
├── tests/ # Automated tests
│ ├── api/ # Tests for API-related logic
│ └── database/ # Tests for database interactions
│
└── index.js # Entry point of the application

## Installation

1. **Clone the repository**:
   git clone <repository-url>
   cd backend

2. **Install dependencies**:
   npm install

3. **Set up environment variables**:
   Create a `.env` file in the root directory and add your environment variables:
   DB_HOST=your_database_host
   DB_USER=your_database_user
   DB_PASSWORD=your_database_password
   DB_NAME=your_database_name
   JWT_SECRET=your_jwt_secret

4. **Run the development server**:
   npm run dev

5. **Run the tests**:
   npm run test

## Dependencies

- **Node.js**: JavaScript runtime.
- **Express**: Web framework for Node.js.
- **PostgreSQL**: Relational database.
- **bcryptjs**: Library for hashing passwords.
- **jsonwebtoken**: Library for creating and verifying JWT tokens.
- **dotenv**: Module to load environment variables.
- **Joi**: Schema validation library.
- **cors**: Middleware for enabling CORS.
- **pg**: PostgreSQL client for Node.js.

## Dev Dependencies

- **Mocha**: Test framework.
- **Chai**: Assertion library for testing.
- **Sinon**: Library for spies, stubs, and mocks in tests.
- **@babel/preset-env**: Babel preset for compiling ES6+ syntax.
- **@babel/register**: Babel require hook for compiling code on the fly.

## Contributing

Contributions are welcome! Please submit a pull request or open an issue for any improvements or bugs.

## License

This project is licensed under the ISC License.
