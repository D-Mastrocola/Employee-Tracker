const inquirer = require("inquirer");
const mysql2 = require("mysql2");
const db = require("./db/connection");
const Read = require("./utils/read");
const Create = require("./utils/create");
const Update = require("./utils/update");

let read = new Read();
let create = new Create();
let update = new Update();

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
      ]
    })
    .then(({ choice }) => {
      console.log(choice);
      //CREATE
      if (choice == "Add a Department") {
        create.createDepartment(); 
      }
      if (choice == "Add a Role") {
        create.createRole();
      }
      if (choice == "Add an Employee") {
        create.createEmployee();
      }
      //READ
      if (choice == "View All Departments") {
        read.viewAllDepartments();
      }
      if (choice == "View All Roles") {
        read.viewAllRoles();
      }
      if (choice == "View All Employees") {
        read.viewAllEmployees();
      }
      //Update
      if(choice === "Update Employee Role") {
        update.updateEmployeeRole();
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
