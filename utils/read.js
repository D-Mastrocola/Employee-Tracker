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
}

module.exports = Read;
