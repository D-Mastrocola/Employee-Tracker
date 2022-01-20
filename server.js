const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const tablePrint = require('console.table');

// Connect to database
const db = mysql2.createConnection(
  {
    host: 'localhost',
    // Your MySQL username,
    user: 'root',
    // Your MySQL password
    password: '',
    database: 'tracker'
  },
  console.log('Connected to the tracker database.')
);

let viewAllDepartments = () => {
  let sql = "SELECT * FROM departemnts";
  db.query(sql, (err, rows) => {
    if (err) {
      res.status(500).json({ error: err.message });
      return;
    }
    res.json({
      message: "success",
      data: rows,
    });
  });
}

inquirer
  .prompt({
    type: 'list',
    name: 'choice',
    message: 'What would you like to do?',
    choices: ['View All Departments', 'View All Roles','View All Employees', 'Add a Department', 'Add a Role', 'Add an Employee', 'Update Employee Role']
  }).then(({ choice }) => {
    console.log(choice);
    if(choice == 'View All Departments') {
      viewAllDepartments();
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