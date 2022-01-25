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
        let sql = `INSERT INTO departments (department_name)
                    VALUES( '${createDepartment}'); `;

        db.query(sql, (err, rows) => {
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
        }]
      )
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
                if(department === roleDepartment) {
                  roleDepartment = index+1;
                }
              })
              console.log(roleTitle);
          console.log(roleSalary);
          console.log(roleDepartment);
              let sql = `INSERT INTO roles (role_title, role_salary, department_id)
        VALUES( '${roleTitle}', ${roleSalary}, ${roleDepartment}); `;

              db.query(sql, (err, rows) => {
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
}

module.exports = Create;
