// const mysql = require("mysql2");

// const pool = mysql.createPool({
//   host: "localhost",
//   user: "root",
//   database: "node-complete",
//   password: "shaam777",
// });

// module.exports = pool.promise();

// ============== using Sequelize =============
// const Sequelize = require("sequelize");

// const sequelize = new Sequelize("node-complete", "root", "shaam777", {
//   dialect: "mysql",
//   host: "localhost",
// });

// module.exports = sequelize;

// ========================== using mongodb =======================
const { MongoClient } = require("mongodb");
const client = new MongoClient(
  "mongodb+srv://ahtishamshakir000:shaam777@cluster0.fyh6w91.mongodb.net/?retryWrites=true&w=majority"
);

let _db;

const mongoConnect = (callback) => {
  client
    .connect()
    .then((client) => {
      _db = client.db();
      callback();
    })
    .catch((err) => {
      console.log(err);
      client.close();
      throw err;
    });
};

const getdb = () => {
  if (_db) {
    return _db;
  }
  throw "No Db found!";
};

exports.mongoConnect = mongoConnect;
exports.getdb = getdb;
