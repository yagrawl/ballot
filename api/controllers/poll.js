const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_poll = (req, res) => {
  let poll_id = req.params.poll_id;

  let sql = `SELECT * from ${database}.${add.bt('polls')} as poll WHERE poll.poll_id = ${add.cm(poll_id)};`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({ details: result });
  });
};
