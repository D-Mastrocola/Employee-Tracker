const mysql2 = require("mysql2");
const tablePrint = require('console.table');
// get the promise implementation, we will use bluebird
const bluebird = require('bluebird');

// Connect to database
const db = mysql2.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "toor",
    database: "tracker",
    Promise: bluebird
  },
  console.log("Connected to the tracker database.")
);

module.exports = db;