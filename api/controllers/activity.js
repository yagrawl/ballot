const db = require('../models/connection');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.poll_vote = (req, res) => {
  let data = req.body;
  data.timestamp = new Date().getTime().toString();

  let sql = `INSERT INTO ${database}` +
            `.${at('activity')} (${at('ip_address')}, ${at('poll_id')}, ${at('timestamp')}, ` +
            `${at('selection')}) VALUES (${cm(data.ip_address)}, ${cm(data.poll_id)}, ` +
            `${cm(data.timestamp)}, ${cm(data.vote)});`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(data);
    });

    res.end();
};

exports.check_if_voted = (req, res) => {
  let ip = req.query.ip;
  let poll = req.query.poll;

  let sql = `SELECT * from ${database}.${at('activity')} as act ` +
            `WHERE act.ip_address = ${cm(ip)} AND act.poll_id = ${cm(poll)};`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    res.send({ details: result });
  });
};

exports.get_analytics = (req, res) => {
  let poll_id = req.params.poll_id;
  let sql = `SELECT * from ${database}.${at('activity')} as act ` +
            `WHERE act.poll_id = ${cm(poll_id)};`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    res.send({ details: result });
  });
}

const at = (input) => {
  let output = "`" + input + "`";
  return output;
}

const cm = (input) => {
  let output = "'" + input + "'";
  return output;
}
