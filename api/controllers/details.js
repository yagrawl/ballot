const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_vote_details = (req, res) => {
  let poll_id = req.params.poll_id;
  let sql = `SELECT ${add.bt('ip_address')}, ${add.bt('selection')}, ` +
            `FROM_UNIXTIME(${add.bt('timestamp')}/1000, ${add.cm('%m/%d %h:%m:%s')}) AS time ` +
            `FROM ${database}.${add.bt('activity')} as act ` +
            `WHERE act.poll_id = ${add.cm(poll_id)};`;

  let sql_timeline = `SELECT COUNT(${add.bt('ip_address')}) AS vote_count, ` +
                     `FROM_UNIXTIME(${add.bt('timestamp')}/1000, ${add.cm('%m/%d')}) AS time ` +
                     `FROM ${database}.${add.bt('activity')} as act ` +
                     `WHERE act.poll_id = ${add.cm(poll_id)} ` +
                     `GROUP BY (FROM_UNIXTIME(${add.bt('timestamp')}/1000, ${add.cm('%m/%d')}))`;

  let vote_data = {};
  con.query(sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    vote_data.main_data = result

    con.query(sql_timeline, function (err, result) {
      try {
        if (err) throw err;
      } catch(error) {
        if(error) {
          console.log('SQL Parsing Error');
        }
      }

      vote_data.timeline = result;
      console.log(vote_data);
      res.send({ details: vote_data });
    });
  });
};
