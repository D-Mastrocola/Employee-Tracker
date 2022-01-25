const db = require("../db/connection");
class Read {
  constructor() {}
  viewAllDepartments() {
    let sql = "SELECT * FROM departments";
    db.execute(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('\n');
      console.table(rows);
    });
    return;
  };
  viewAllRoles() {
    let sql = `SELECT * FROM roles 
    LEFT JOIN departments ON roles.department_id = departments.id;`
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('\n');
      console.table(rows);
    });
    return;
  };
  viewAllEmployees() {
    let sql = `SELECT * FROM employees
    LEFT JOIN roles ON employees.role_id = roles.id
    LEFT JOIN departments ON roles.department_id = departments.id;`
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.log('\n');
      console.table(rows);
    });
    return;
  };
}

module.exports = Read;
