const inquirer = require("inquirer");
const db = require("../db/connection");
const Read = require("./read");

let read = new Read();

class Create {
  constructor() {}
  createDepartment() {
    inquirer
      .prompt({
        type: "input",
        name: "createDepartment",
        message: "What would you like to name the department?",
        validate: (input) => {
          if (input.trim().length > 0) {
            return true;
          }
          console.log("\nMust be at least 1 character long!");
          return false;
        },
      })
      .then(({ createDepartment }) => {
        console.log(createDepartment);
        let sql = `INSERT INTO departments (department_name) VALUES(?); `;
        let params = [createDepartment];
        db.query(sql, params, (err, rows) => {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("SUCCESS");
          read.viewAllDepartments();
        });
      });
    return;
  }
  createRole() {
    inquirer
      .prompt([
        {
          type: "input",
          name: "roleTitle",
          message: "What is the title of the Role?",
          validate: (input) => {
            if (input.trim().length > 0) {
              return true;
            }
            console.log("\nMust be at least 1 character long!");
            return false;
          },
        },
        {
          type: "number",
          name: "roleSalary",
          message: "What is the role's salary?",
          validate: (input) => {
            if (input > 0) {
              return true;
            }
            console.log("\nMust be at a value greater than 0!");
            return false;
          },
        },
      ])
      .then(({ roleTitle, roleSalary }) => {
        db.query("SELECT * from departments;", (err, rows) => {
          if (err) {
            console.log(err.message);
            return;
          }
          let departments = [];
          rows.forEach((row) => {
            departments.push(row.department_name);
          });
          console.log(departments);
          console.log(roleTitle);
          console.log(roleSalary);
          inquirer
            .prompt({
              type: "list",
              name: "roleDepartment",
              message: "What department is the role in?",
              choices: [...departments],
            })
            .then(({ roleDepartment }) => {
              departments.forEach((department, index) => {
                if (department === roleDepartment) {
                  roleDepartment = index + 1;
                }
              });
              console.log(roleTitle);
              console.log(roleSalary);
              console.log(roleDepartment);
              let sql = `INSERT INTO roles (role_title, role_salary, department_id) VALUES(?,?,?); `;
              let params = [roleTitle, roleSalary, roleDepartment];

              db.query(sql, params, (err, rows) => {
                if (err) {
                  console.log(err.message);
                  return;
                }
                console.log("SUCCESS");
              });
            });
        });
      });
    return;
  }
  createEmployee() {
    let roles = [];
    let rolesList = [];
    db.query(`SELECT * from roles`, (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      rows.forEach((row) => {
        roles.push(row);
        rolesList.push(row.role_title);
      });
      console.log(roles);
      inquirer
        .prompt([
          {
            type: "input",
            name: "firstName",
            message: "First name:",
            validate: (input) => {
              if (input.trim().length > 0) {
                return true;
              }
              console.log("\nMust be at least 1 character long!");
              return false;
            },
          },
          {
            type: "input",
            name: "lastName",
            message: "Last name:",
            validate: (input) => {
              if (input.trim().length > 0) {
                return true;
              }
              console.log("\nMust be at least 1 character long!");
              return false;
            },
          },
          {
            type: "list",
            name: "employeeRole",
            message: "What role is the employee?",
            choices: [...rolesList],
          },
        ])
        .then(({ firstName, lastName, employeeRole }) => {
          let roleId;

          roles.forEach((role) => {
            if (role.role_title == employeeRole) {
              roleId = role.id;
            }
          });
          let sql = `INSERT INTO employees (first_name, last_name, role_id) VALUES (?,?,?);`;
          let params = [firstName, lastName, roleId];
          console.log(params)
          console.log(sql);
          db.query(sql, params, (err, rows) => {
            if (err) {
              console.log(err.message);
              return;
            }
            console.log("SUCCESS");
            read.viewAllEmployees();
          });
        });
    });
  }
}

module.exports = Create;
