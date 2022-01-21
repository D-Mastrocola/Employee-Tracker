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
        let sql = `INSERT INTO departments (name)
                    VALUES( '${createDepartment}'); `;

        db.query(sql, (err, rows) => {
          if (err) {
            console.log(err.message);
            return;
          }
          console.log("SUCCESS");
        });
      });
      return;
  }
}

module.exports = Create;
