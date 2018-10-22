const SqlString = require('sqlstring');
const SQL = require('sql-template-strings');
const db = require('../models/connection');
const con = db.con;

con.connect(err => {
  if (err) throw err;
});

exports.demo_create = (req, res) => {
  let key = req.body.ckey;
  let value = req.body.cvalue;

  let sql = "INSERT INTO `ballot`.`demo` (`key`, `value`)" +
            "VALUES ('" + key + "', '" + value + "'); " +
            "SELECT * from `ballot`.`demo`";
  con.query(sql, (err, result) => {
    if (err) throw err;
    let data = result[1];
    console.log(data);
    console.log('change2');
    res.send({ result: data });
  });

};

exports.demo_read = (req, res) => {
  let key = req.query.key;
  let sql = "SELECT * from `ballot`.`demo` as tab WHERE tab.key = '" + key + "'";
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ result: result });
  });
}

exports.demo_table = (req, res) => {
  let sql = "SELECT * from `ballot`.`demo`";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({ result: result });
  });
}
