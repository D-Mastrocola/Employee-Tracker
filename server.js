const inquirer = require('inquirer');
const mysql2 = require('mysql2');
const tablePrint = require('console.table');

console.table([
  {
    name: 'foo',
    age: 10
  }, {
    name: 'bar',
    age: 20
  }
]);
