const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_stats = (req, res) => {
  let stats = {};
  // Get event count
  let sql = `SELECT COUNT(${add.bt('event_time')}) AS event_count, ` +
            `COUNT(DISTINCT ${add.bt('event_creator_ip')}) AS ip_count ` +
            `FROM ${database}.${add.bt('events')}; ` +
            `SELECT COUNT(${add.bt('poll_id')}) AS poll_count ` +
            `FROM ${database}.${add.bt('polls')}; ` +
            `SELECT COUNT(${add.bt('timestamp')}) AS vote_count ` +
            `FROM ${database}.${add.bt('activity')};`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    stats.event_count = result[0][0].event_count;
    stats.ip_count = result[0][0].ip_count;
    stats.poll_count = result[1][0].poll_count;
    stats.vote_count = result[2][0].vote_count;
    console.log('STATS: ', stats);
    res.send({result: stats});
  });
}
