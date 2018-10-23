const db = require('../models/connection');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_poll = (req, res) => {
  let poll_id = req.params.poll_id;

  let sql = `SELECT * from ${database}.${at('polls')} as poll WHERE poll.poll_id = ${cm(poll_id)};`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ details: result });
  });
};

const at = (input) => {
  let output = "`" + input + "`";
  return output;
}

const cm = (input) => {
  let output = "'" + input + "'";
  return output;
}
