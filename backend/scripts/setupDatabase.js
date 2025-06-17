const mysql = require("mysql2");
const fs = require("fs").promises;
const path = require("path");
require("dotenv").config();

async function setupDatabase() {
  // First connection without database selection
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    multipleStatements: true, // Enable multiple SQL statements
  });

  try {
    // Read SQL file
    const sqlFile = await fs.readFile(
      path.join(__dirname, "../database.sql"),
      "utf8"
    );

    console.log("Creating database and tables...");

    // Execute SQL statements
    connection.query(sqlFile, (err, results) => {
      if (err) {
        console.error("Error executing SQL file:", err);
        process.exit(1);
      }

      console.log("Database setup completed successfully!");
      console.log("You can now start the application.");

      // Close connection
      connection.end();
    });
  } catch (err) {
    console.error("Error reading SQL file:", err);
    process.exit(1);
  }
}

// Run setup
setupDatabase();