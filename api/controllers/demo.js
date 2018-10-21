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

  let sql = "INSERT INTO `ballot`.`demo` (`key`, `value`) VALUES ('" + key + "', '" + value + "')";
  con.query(sql, (err, result) => {
    if (err) throw err;
  });

};

exports.demo_read = (req, res) => {
  console.log(req.query);
  res.send({ value: 'yash' });
}

exports.demo_table = (req, res) => {
  let sql = "SELECT * from `ballot`.`demo`";
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({ result: result });
  });
}
