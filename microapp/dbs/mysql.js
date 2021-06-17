const mysql = require("mysql");
const config = require("../config");

const connection = mysql.createConnection({
  host: config.db.HOST,
  port: config.db.PORT,
  user: config.db.USER,
  password: config.db.PASSWORD,
  database: config.db.DB
});

connection.connect(error => {
  if (error) {
    console.log(`Mysql connection error: ${error}`);
  } else {
    console.log("Successfully connected to mysql database.");
  }
});

module.exports = connection;
