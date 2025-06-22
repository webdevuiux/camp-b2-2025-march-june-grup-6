const path = require("path");
const mysql = require("mysql2");
const dotenv = require("dotenv");

// Set path to one directory up from current file
const envPath = path.resolve(__dirname, "../.env");

// Load .env file manually
dotenv.config({ path: envPath });

const pool = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const promisePool = pool.promise();

module.exports = promisePool;
