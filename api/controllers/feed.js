const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_feed_poll = (req, res) => {
  let sql = `SELECT ${add.bt('poll_id')}, COUNT(${add.bt('poll_id')}) AS act_count ` +
            `FROM ${database}.${add.bt('activity')} AS act ` +
            `GROUP BY ${add.bt('poll_id')};`;

  con.query(sql, function (err, result) {
    if (err) throw err;
    result = result.sort(add.compare).slice(0, 5);
    res.send({ details: result });
  });
}
