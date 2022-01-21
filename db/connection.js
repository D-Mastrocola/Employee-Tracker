const mysql = require("mysql2");
const tablePrint = require('console.table');

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "toor",
    database: "tracker",
  },
  console.log("Connected to the election database.")
);

module.exports = db;