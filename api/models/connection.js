const mysql = require('mysql');

const host = process.env.DB_HOST || "localhost";
const user = process.env.DB_USERNAME || "root";
const password = process.env.DB_PASSWORD || "password";
const database = process.env.DB_NAME || "ballot";

exports.con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  database: database,
  multipleStatements: true
});
