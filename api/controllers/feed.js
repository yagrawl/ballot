const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_feed_poll = (req, res) => {
  let sql = `SELECT ${add.bt('poll_id')} ` +
            `FROM ${database}.${add.bt('activity')} AS act ` +
            `WHERE ${add.bt('poll_id')} IN (SELECT ${add.bt('poll_id')} ` +
            `FROM ${database}.${add.bt('polls')} ` +
            `WHERE ${add.bt('feed_privacy')} = 'true' AND ${add.bt('archieved')} = 'false' AND ` +
            `FROM_UNIXTIME((${add.bt('creation_time')} + ${add.bt('expiration_time')}` +
            `*86400000)/1000, '20%y-%m-%d %h:%m:%s') > NOW()) ` +
            `GROUP BY ${add.bt('poll_id')} ` +
            `ORDER BY COUNT(${add.bt('poll_id')}) DESC`;

  con.query(sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    let top_polls = result.sort(add.compare);
    res.send({ details: top_polls });
  });
}
