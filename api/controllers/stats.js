const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_stats = (req, res) => {
  let stats = {};

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
            `GROUP BY ${add.bt('event_route')};` +
            `SELECT ${add.bt('feed_privacy')}, COUNT(${add.bt('feed_privacy')}) AS feed_privacy_count ` +
            `FROM ${database}.${add.bt('polls')} ` +
            `GROUP BY ${add.bt('feed_privacy')};` +
            `SELECT ${add.bt('analytics_privacy')}, COUNT(${add.bt('analytics_privacy')}) AS analytics_privacy_count ` +
            `FROM ${database}.${add.bt('polls')} ` +
            `GROUP BY ${add.bt('analytics_privacy')};` +
            `SELECT COUNT(${add.bt('option_3')}) AS opt3_count ` +
            `FROM ${database}.${add.bt('polls')} ` +
            `WHERE option_3 = 'NULL';` +
            `SELECT COUNT(${add.bt('option_4')}) AS opt4_count ` +
            `FROM ${database}.${add.bt('polls')} ` +
            `WHERE option_4 = 'NULL';` +
            `SELECT ${add.bt('expiration_time')} ` +
            `FROM ${database}.${add.bt('polls')};` +
            `SELECT COUNT(${add.bt('user_id')}) AS all_users ` +
            `FROM ${database}.${add.bt('users')};` +
            `SELECT COUNT(${add.bt('log_count')}) AS returning_users ` +
            `FROM ${database}.${add.bt('users')} ` +
            `WHERE ${add.bt('log_count')} > 1;` +
            `SELECT COUNT(${add.bt('poll_id')}) AS poll_count, ` +
            `FROM_UNIXTIME(${add.bt('polls')}.${add.bt('creation_time')}/1000, ${add.cm('%m/%d')}) AS day ` +
            `FROM ${database}.${add.bt('polls')} ` +
            `GROUP BY (FROM_UNIXTIME(${add.bt('polls')}.${add.bt('creation_time')}/1000, ${add.cm('%m/%d')}));` +
            `SELECT COUNT(${add.bt('event_id')}) AS event_count, ` +
            `FROM_UNIXTIME(${add.bt('events')}.${add.bt('event_time')}/1000, ${add.cm('%m/%d')}) AS day ` +
            `FROM ${database}.${add.bt('events')} ` +
            `GROUP BY (FROM_UNIXTIME(${add.bt('events')}.${add.bt('event_time')}/1000, ${add.cm('%m/%d')}));`;

  stats.browsers = [];
  stats.os = [];
  stats.routes = [];
  stats.feed_privacy = [];
  stats.analytics_privacy = [];
  stats.options = [];
  stats.expiration_time = [];
  stats.returning_users = [];
  stats.polls_time = [];
  stats.events_time = [];
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

    let feed;
    fill = ['#2f4b7c', '#f95d6a'];
    for(let i = 0; i < result[7].length; i++) {
      feed = {};
      feed.feed_privacy = result[7][i].feed_privacy;
      feed.feed_privacy_count = result[7][i].feed_privacy_count;
      feed.fill = fill[i];
      stats.feed_privacy.push(feed);
    }

    let analytics;
    fill = ['#665191', '#ffa600'];
    for(let i = 0; i < result[8].length; i++) {
      analytics = {};
      analytics.analytics_privacy = result[8][i].analytics_privacy;
      analytics.analytics_privacy_count = result[8][i].analytics_privacy_count;
      analytics.fill = fill[i];
      stats.analytics_privacy.push(analytics);
    }

    let options_3 = result[9][0].opt3_count;
    let options_4 = result[10][0].opt4_count;

    let opts = {};
    opts.option_no = '2 options';
    opts.poll_count = options_3;
    stats.options.push(opts);

    opts = {};
    opts.option_no = '3 options';
    opts.poll_count = options_4 - options_3;
    stats.options.push(opts);

    opts = {};
    opts.option_no = '4 options';
    opts.poll_count = stats.poll_count - options_4;
    stats.options.push(opts);

    let expiration_time_buckets = {'<5 days': 0,
                                   '6 - 10 days': 0,
                                   '11 - 15 days': 0,
                                   '16 - 20 days': 0,
                                   '21 - 25 days': 0,
                                   '>25 days': 0};
    for(let i = 0; i < result[11].length; i++) {
      let expire_time = parseInt(result[11][i].expiration_time);
      if(expire_time <= 5) {
        expiration_time_buckets['<5 days'] += 1
      } else if(expire_time <= 10) {
        expiration_time_buckets['6 - 10 days'] += 1
      } else if(expire_time <= 15) {
        expiration_time_buckets['11 - 15 days'] += 1
      } else if(expire_time <= 20) {
        expiration_time_buckets['16 - 20 days'] += 1
      } else if(expire_time <= 25) {
        expiration_time_buckets['21 - 25 days'] += 1
      } else {
        expiration_time_buckets['>25 days'] += 1
      }
    }

    let expire_time;
    for(let val in expiration_time_buckets) {
      let expire_time = {};
      expire_time.duration = val;
      expire_time.count = expiration_time_buckets[val];
      stats.expiration_time.push(expire_time);
    }

    let users = {};
    users.name = 'Non-Returning Users';
    users.count = result[12][0].all_users - result[13][0].returning_users;
    users.fill = '#8884d8';
    stats.returning_users.push(users);

    users = {};
    users.name = 'Returning Users';
    users.count = result[13][0].returning_users;
    users.fill = '#f95d6a';
    stats.returning_users.push(users);

    let polls_time;
    for(let i = 0; i < result[14].length; i++) {
      polls_time = {};
      polls_time.day = result[14][i].day;
      polls_time.poll_count = result[14][i].poll_count;
      stats.polls_time.push(polls_time);
    }

    let events_time;
    for(let i = 0; i < result[15].length; i++) {
      events_time = {};
      events_time.day = result[15][i].day;
      events_time.event_count = result[15][i].event_count;
      stats.events_time.push(events_time);
    }

    console.log('STATS: ', stats);
    res.send({result: stats});
  });
}

exports.get_map_key = (req, res) => {
  console.log('send key');
  res.send({key: process.env.GOOGLE_MAPS_KEY});
};
