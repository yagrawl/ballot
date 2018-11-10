const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_poll = (req, res) => {
  let poll_id = req.params.poll_id;

  let sql = `SELECT * from ${database}.${add.bt('polls')} as poll WHERE poll.poll_id = ${add.cm(poll_id)};`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    result[0].question = add.fixComma(result[0].question);
    result[0].option_1 = add.fixComma(result[0].option_1);
    result[0].option_2 = add.fixComma(result[0].option_2);
    result[0].option_3 = add.fixComma(result[0].option_3);
    result[0].option_4 = add.fixComma(result[0].option_4);
    res.send({ details: result });
  });
};
