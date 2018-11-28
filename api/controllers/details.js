const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_vote_details = (req, res) => {
  let poll_id = req.params.poll_id;
  let sql = `SELECT * from ${database}.${add.bt('activity')} as act ` +
            `WHERE act.poll_id = ${add.cm(poll_id)};`;

  con.query(sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    console.log(result);

    res.send({ details: result });
  });
};
