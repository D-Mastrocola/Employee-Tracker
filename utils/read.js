let viewAllDepartments = () => {
  let sql = "SELECT * FROM departments";
  db.query(sql, (err, rows) => {
    if (err) {
      console.log({ error: err.message });
      return;
    }
    console.table(rows)
  });
}