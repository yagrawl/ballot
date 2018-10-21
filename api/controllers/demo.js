let db = require('../models/connection');

exports.demo_create = (req, res) => {
  let key = req.body.ckey;
  let value = req.body.cvalue;
  let con = db.con;

  con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
    var sql = "INSERT INTO `ballot`.`demo` (`key`, `value`) VALUES ('4', 'd')";
    con.query(sql, function (err, result) {
      if (err) throw err;
      console.log("1 record inserted");
    });
  });

};

exports.demo_read = (req, res) => {
  console.log(req.query);
  res.send({ value: 'yash' });
}
