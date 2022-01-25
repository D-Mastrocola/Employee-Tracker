const mysql2 = require("mysql2");

// Connect to database
const db = mysql2.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "toor",
    database: "tracker",
  },
  console.log("Connected to the tracker database.")
);

module.exports = db;