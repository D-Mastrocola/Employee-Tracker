const inquirer = require('inquirer');
const db = require('../db/connection');
 
let Create = () => {
  let department = () => {

    inquirer
    .prompt({
      type: 'text',
      name: 'newDepartmentName',
      message: 'What would you like to name the department?',
      
    }).then(({ choice }) => {
      console.log(choice);
      if(choice == 'View All Departments') {
        viewAllDepartments();
      }
    });
  }
}