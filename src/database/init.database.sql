-- Create the database
CREATE DATABASE fuiquity;

-- Drop tables if they exist
DROP TABLE IF EXISTS progressions;
DROP TABLE IF EXISTS comments;
DROP TABLE IF EXISTS sets;
DROP TABLE IF EXISTS workouts;
DROP TABLE IF EXISTS days;
DROP TABLE IF EXISTS weeks;
DROP TABLE IF EXISTS exercises;
DROP TABLE IF EXISTS users;
DROP TABLE IF EXISTS roles;

-- Create roles table
CREATE TABLE roles (
    role_id SERIAL PRIMARY KEY,
    role_name VARCHAR(50) UNIQUE NOT NULL,
    role_description TEXT
);

-- Insert default roles into the roles table
INSERT INTO roles (role_id, role_name, role_description) VALUES
(1, 'user', 'Default role for regular users.'),
(2, 'moderator', 'Role for users who can moderate content.'),
(3, 'support', 'Role for support staff.'),
(4, 'admin', 'Role for administrators with full access.');

-- Create users table
CREATE TABLE users (
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(100) NOT NULL,
    role_id INT DEFAULT 1 REFERENCES roles(role_id) NOT NULL
);

-- Create exercises table
CREATE TABLE exercises (
    exercise_id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    photo_url TEXT,
    description TEXT
);

-- Create weeks table
CREATE TABLE weeks (
    week_id SERIAL PRIMARY KEY,
    user_id INT REFERENCES users(user_id) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL
);

-- Create days table
CREATE TABLE days (
    day_id SERIAL PRIMARY KEY,
    week_id INT REFERENCES weeks(week_id) NOT NULL,
    day_of_week VARCHAR(10) NOT NULL, -- Example: 'Monday', 'Tuesday'
    workout_type VARCHAR(10) NOT NULL CHECK (workout_type IN ('leg', 'push', 'pull'))
);

-- Create workouts table
CREATE TABLE workouts (
    workout_id SERIAL PRIMARY KEY,
    day_id INT REFERENCES days(day_id) NOT NULL,
    exercise_id INT REFERENCES exercises(exercise_id) NOT NULL
);

-- Create sets table
CREATE TABLE sets (
    set_id SERIAL PRIMARY KEY,
    workout_id INT REFERENCES workouts(workout_id) NOT NULL,
    weight DECIMAL(5,2),
    repetitions INT,
    set_order INT -- Order of the set in the workout
);

-- Create comments table
CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    workout_id INT REFERENCES workouts(workout_id) NOT NULL,
    comment TEXT
);

-- Create progressions table
CREATE TABLE progressions (
    progression_id SERIAL PRIMARY KEY,
    workout_id INT REFERENCES workouts(workout_id) NOT NULL,
    progression_notes TEXT
);

-- Create the trigger function to prevent overlapping weeks
CREATE OR REPLACE FUNCTION check_week_overlap() 
RETURNS TRIGGER AS $$
BEGIN
    -- Check if there is an existing week that overlaps with the new week
    IF EXISTS (
        SELECT 1 
        FROM weeks 
        WHERE user_id = NEW.user_id 
          AND NEW.start_date BETWEEN start_date AND end_date
    ) THEN
        RAISE EXCEPTION 'The new week starts within the range of an existing week.';
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create the trigger to call the function before inserting a new week
CREATE TRIGGER before_insert_week
BEFORE INSERT ON weeks
FOR EACH ROW
EXECUTE FUNCTION check_week_overlap();
