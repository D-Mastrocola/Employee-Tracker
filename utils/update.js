const db = require("../db/connection");
const inquirer = require("inquirer");
class Update {
  constructor() {}
  updateEmployeeRole() {
    let employees = [];
    let employeesList = [];
    db.query(`SELECT * from employees;`, (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      rows.forEach((row) => {
        employees.push(row);
        employeesList.push(row.first_name + " " + row.last_name);
      });
      inquirer
        .prompt({
          type: "list",
          name: "selectedEmployee",
          message: "Which employee?",
          choices: [...employeesList],
        })
        .then(({selectedEmployee}) => {
          let employeeId;

          employees.forEach((employee) => {
            if (
              employee.first_name + " " + employee.last_name ===
              selectedEmployee
            ) {
              employeeId = employee.id;
            }
          });
          db.query("SELECT * from roles;", (err, rows) => {
            if (err) {
              console.log(err.message);
              return;
            }
            let roles = [];
            let rolesList = [];
            rows.forEach((row) => {
              roles.push(row);
              rolesList.push(row.role_title);
            });

            inquirer
              .prompt({
                type: "list",
                name: "newRole",
                message: "What is the new role?",
                choices: [...rolesList],
              })
              .then(({newRole}) => {
                let roleId;
                roles.forEach((role) => {
                  if (role.role_title === newRole) {
                    roleId = role.id;
                  }
                });
                let sql = `UPDATE employees SET role_id = ? 
                  WHERE id = ?`;
                let params = [roleId, employeeId];
                console.log(params);
                db.query(sql, params, (err, rows) => {
                  if (err) {
                    console.log(err.message);
                    return;
                  }
                  console.log("Employee Role Updated");
                });
              });
          });
        });
    });
  }
}

module.exports = Update;
