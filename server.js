const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const db = require("./db/connection");
const Read = require("./utils/read");
const Create = require("./utils/create");

let read = new Read();
let create = new Create();

let running = true;

let chooseAction = () => {


  inquirer
    .prompt({
      type: "list",
      name: "choice",
      message: "What would you like to do?",
      choices: [
        "View All Departments",
        "View All Roles",
        "View All Employees",
        "Add a Department",
        "Add a Role",
        "Add an Employee",
        "Update Employee Role",
        "Quit",
      ],
    })
    .then(({ choice }) => {
      console.log(choice);
      if (choice == "View All Departments") {
        read.viewAllDepartments();
      }
      if (choice == "Add a Department") {
        create.createDepartment();
      }
      if (choice == "Quit") {
        running = false;
      }
    });
};

let checkQuit = () => {
  if (running) {
    chooseAction();
  } else {
    console.log('Ending')
    return;
  }
}
checkQuit();
