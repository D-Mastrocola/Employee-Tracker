const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const tablePrint = require('console.table');
const db = require('./db/connection');
const Read = require('./utils/read');



let read = new Read();

inquirer
  .prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles','View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role']
  }).then(({ choice }) => {
    console.log(choice);
    if(choice == 'View All Departments') {
      read.viewAllDepartments();
    }
  });

/*console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);*/

/*db.query(sql, (err, rows) => {
  if (err) {
    res.status(500).json({ error: err.message });
    return;
  }
  res.json({
    message: "success",
    data: rows,
  });
});*/