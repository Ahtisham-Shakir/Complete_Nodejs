// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "shaam777",
// });

// module.exports = pool.promise();

// ============== using Sequelize =============
const Sequelize = require("sequelize");

const sequelize = new Sequelize("node-complete", "root", "shaam777", {
  dialect: "mysql",
  host: "localhost",
});

module.exports = sequelize;
