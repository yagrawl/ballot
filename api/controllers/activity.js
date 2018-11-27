const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.poll_vote = (req, res) => {
  let data = req.body;
  data.timestamp = new Date().getTime().toString();

  let sql = `INSERT INTO ${database}` +
            `.${add.bt('activity')} (${add.bt('ip_address')}, ${add.bt('poll_id')}, ${add.bt('timestamp')}, ` +
            `${add.bt('selection')}) VALUES (${add.cm(data.ip_address)}, ${add.cm(data.poll_id)}, ` +
            `${add.cm(data.timestamp)}, ${add.cm(data.vote)});`;

    con.query(sql, (err, result) => {
      try {
        if (err) throw err;
      } catch(error) {
        if(error) {
          console.log('SQL Parsing Error');
        }
      }
    });

    res.end();
};

exports.check_if_voted = (req, res) => {
  let ip = req.query.ip;
  let poll = req.query.poll;

  let sql = `SELECT * from ${database}.${add.bt('activity')} as act ` +
            `WHERE act.ip_address = ${add.cm(ip)} AND act.poll_id = ${add.cm(poll)};`;

  con.query(sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    res.send({ details: result });
  });
};

exports.get_analytics = (req, res) => {
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

    res.send({ details: result });
  });
}

exports.get_pre_analytics = (req, res) => {
  let poll_id = req.params.poll_id;
  let sql = `SELECT ${add.bt('selection')} AS opt, COUNT(${add.bt('selection')}) AS vote_count ` +
            `from ${database}.${add.bt('activity')} as act ` +
            `WHERE act.poll_id = ${add.cm(poll_id)} ` +
            `GROUP BY ${add.bt('selection')};`;
  con.query(sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    let stats = {'1': '0%', '2': '0%', '3': '0%', '4': '0%'};
    let total_votes = 0;

    for(let i = 0; i < result.length; i++) {
      total_votes += result[i].vote_count;
    }

    for(let i = 0; i < result.length; i++) {
      stats[result[i].opt] = ((result[i].vote_count/total_votes)*100).toString() + '%';
    }

    res.send({ details: stats });
  });
}
