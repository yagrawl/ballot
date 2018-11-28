const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_vote_details = (req, res) => {
  let poll_id = req.params.poll_id;

  let poll_sql = `SELECT * from ${database}.${add.bt('polls')} as poll WHERE poll.poll_id = ${add.cm(poll_id)};`;
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

  con.query(poll_sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    if(result.length === 0) {
      console.log('Poll Not Found');
    } else {
      result[0].question = add.fixComma(result[0].question);
      result[0].options = {'1': '', '2': '', '3': '', '4': ''};
      result[0].options['1'] = add.fixComma(result[0].option_1);
      result[0].options['2'] = add.fixComma(result[0].option_2);
      result[0].options['3'] = add.fixComma(result[0].option_3);
      result[0].options['4'] = add.fixComma(result[0].option_4);

      vote_data.poll_data = result;

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
    }
  });
};
