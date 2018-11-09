const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_stats = (req, res) => {
  let stats = {};
  // Get event count
  let sql = `SELECT COUNT(${add.bt('event_time')}) AS event_count, ` +
            `COUNT(DISTINCT ${add.bt('event_creator_ip')}) AS ip_count ` +
            `FROM ${database}.${add.bt('events')};` +
            `SELECT COUNT(${add.bt('poll_id')}) AS poll_count ` +
            `FROM ${database}.${add.bt('polls')};` +
            `SELECT COUNT(${add.bt('timestamp')}) AS vote_count ` +
            `FROM ${database}.${add.bt('activity')};` +
            `SELECT DISTINCT(${add.bt('ip')}), ${add.bt('lat')}, ${add.bt('long')} ` +
            `FROM ${database}.${add.bt('location')};` +
            `SELECT ${add.bt('browser')}, COUNT(${add.bt('browser')}) AS browser_count ` +
            `FROM ${database}.${add.bt('events')} ` +
            `GROUP BY ${add.bt('browser')};` +
            `SELECT ${add.bt('os')}, COUNT(${add.bt('os')}) AS os_count ` +
            `FROM ${database}.${add.bt('events')} ` +
            `GROUP BY ${add.bt('os')};` +
            `SELECT ${add.bt('event_route')}, COUNT(${add.bt('event_route')}) AS route_count ` +
            `FROM ${database}.${add.bt('events')} ` +
            `GROUP BY ${add.bt('event_route')};`;

  stats.browsers = [];
  stats.os = [];
  stats.routes = [];
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result);
    stats.event_count = result[0][0].event_count;
    stats.ip_count = result[0][0].ip_count;
    stats.poll_count = result[1][0].poll_count;
    stats.vote_count = result[2][0].vote_count;
    stats.ip_locations = result[3];

    let browser;
    for(let i = 0; i < result[4].length; i++) {
      browser = {};
      browser.browser = result[4][i].browser;
      browser.browser_count = result[4][i].browser_count;
      stats.browsers.push(browser);
    }

    let os;
    for(let i = 0; i < result[5].length; i++) {
      os = {};
      os.os = result[5][i].os;
      os.os_count = result[5][i].os_count;
      stats.os.push(os);
    }

    let route;
    let fill = ['#8884d8', '#83a6ed', '#8dd1e1', '#82ca9d', '#a4de6c', '#d0ed57', '#ffc658']
    for(let i = 0; i < result[6].length; i++) {
      route = {};
      route.event_route = result[6][i].event_route;
      route.route_count = result[6][i].route_count;
      route.fill = fill[i%7];
      stats.routes.push(route);
    }

    console.log('STATS: ', stats);
    res.send({result: stats});
  });
}

exports.get_map_key = (req, res) => {
  console.log('send key');
  res.send({key: process.env.GOOGLE_MAPS_KEY});
};
