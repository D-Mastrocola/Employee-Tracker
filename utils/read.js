const db = require("../db/connection");
class Read {
  constructor() {}
  viewAllDepartments() {
    let sql = "SELECT * FROM departments";
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
  viewAllRoles() {
    let sql = `SELECT * FROM roles 
    LEFT JOIN departments ON roles.department_id = departments.id
    GROUP BY department_id ORDER BY role_salary DESC;`
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
    LEFT JOIN roles ON employees.roles_id = roles.id
    GROUP BY roles_id ORDER BY roles.role_salary DESC;`
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
