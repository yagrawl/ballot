const db = require('../models/connection');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_feed_poll = (req, res) => {
  let sql = `SELECT ${at('poll_id')}, COUNT(${at('poll_id')}) AS act_count ` +
            `FROM ${database}.${at('activity')} AS act ` +
            `GROUP BY ${at('poll_id')};`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    result = result.sort(compare).slice(0, 5);
    console.log(result);
    res.send({ details: result });
  });
}

const compare = (a, b) => {
  if(a.act_count < b.act_count) {
    return 1;
  }
  if(a.act_count > b.act_count) {
    return -1;
  }
  return 0;
}

const at = (input) => {
  let output = "`" + input + "`";
  return output;
}

const cm = (input) => {
  let output = "'" + input + "'";
  return output;
}
