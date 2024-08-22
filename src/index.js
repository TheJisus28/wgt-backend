import app from "./api/v1/app.js"; // Importing the Express application
import { PORT } from "./config/config.js"; // Importing the server port
import { db } from "./database/connection.database.js"; // Importing the database connection

async function bootstrap() {
  console.clear(); // Clearing the console
  try {
    // Checking database connection
    await db.query("SELECT NOW()", () => {
      console.log("DATABASE CONNECTED SUCCESSFULLY"); // Successful database connection
      app.listen(PORT, () => {
        console.log(`APP LISTENING AT THE PORT ${PORT}`); // Starting the server
      });
    });
  } catch (error) {
    console.log(error); // Logging any connection errors
  }
}

bootstrap(); // Initiating the bootstrap process
