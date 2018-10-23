const SqlString = require('sqlstring');
const SQL = require('sql-template-strings');
const db = require('../models/connection');
const con = db.con;
const database = process.env.DB_NAME || "ballot";

con.connect(err => {
  if (err) throw err;
});

exports.demo_create = (req, res) => {
  let key = req.body.ckey;
  let value = req.body.cvalue;
  let check_sql = "SELECT * from `" + database + "`.`demo` as tab WHERE tab.key = '" + key + "'";
  con.query(check_sql, function (err, result) {
    if (err) throw err;
    if(result.length === 0) {
      let sql = "INSERT INTO `" + database + "`.`demo` (`key`, `value`)" +
                "VALUES ('" + key + "', '" + value + "'); " +
                "SELECT * from `" + database + "`.`demo`";
      con.query(sql, (err, result) => {
        if (err) throw err;
        let data = result[1];
        console.log(data);
      });
    }
  });
};

exports.demo_read = (req, res) => {
  let key = req.query.key;
  let sql = "SELECT * from `" + database + "`.`demo` as tab WHERE tab.key = '" + key + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ result: result });
  });
}

exports.demo_update = (req, res) => {
  let key = req.body.ukey;
  let value = req.body.uvalue;

  let sql = "UPDATE `" + database + "`.`demo` SET `value` = '" + value +
            "' WHERE `key` = '" + key + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ result: result });
  });
}

exports.demo_delete = (req, res) => {
  let key = req.query.key;
  let sql = "DELETE from `" + database + "`.`demo` WHERE `key` = '" + key + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ result: result });
  });
}

exports.demo_table = (req, res) => {
  let sql = "SELECT * from `" + database + "`.`demo`";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({ result: result });
  });
}
