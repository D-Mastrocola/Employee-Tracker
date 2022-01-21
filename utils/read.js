class Read {
  constructor() {}
  viewAllDepartments() {
    let sql = "SELECT * FROM departemnts";
    db.query(sql, (err, rows) => {
      if (err) {
        console.log(err.message);
        return;
      }
      console.table(row);
    });
  };
}

module.exports = Read;
