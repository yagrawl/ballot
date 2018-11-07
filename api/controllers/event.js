const db = require('../models/connection');
const add = require('../models/helpers');
const cryptoRandomString = require('crypto-random-string');
const geoip = require('geoip-lite');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.add_event = (req, res) => {
  let data = req.body;
  data.event_creator_ip = req.headers['x-forwarded-for'].toString().split(',')[0];
  data.event_id = cryptoRandomString(10);
  let location = geoip.lookup(data.event_creator_ip);
  console.log('Event Data : ', data);

  let sql = `INSERT INTO ${database}` +
            `.${add.bt('events')} (${add.bt('event_id')}, ${add.bt('event_name')}, ${add.bt('event_time')}, ${add.bt('event_creator_ip')}, ${add.bt('event_creator_id')}, ` +
            `${add.bt('event_route')}, ${add.bt('browser')}, ${add.bt('browser_version')}, ` +
            `${add.bt('engine')}, ${add.bt('os')}, ${add.bt('os_version')}) ` +
            `VALUES (${add.cm(data.event_id)}, ${add.cm(data.event_name)}, ${add.cm(data.event_time)}, ${add.cm(data.event_creator_ip)}, ` +
            `${add.cm(data.event_creator_id)}, ${add.cm(data.event_route)}, ${add.cm(data.event_device.browser)}, ` +
            `${add.cm(data.event_device.browser_version)}, ${add.cm(data.event_device.engine)}, ${add.cm(data.event_device.os)}, ` +
            `${add.cm(data.event_device.os_version)});`;

  let sql_loc = `INSERT INTO ${database}` +
                `.${add.bt('location')} (${add.bt('location_id')}, ${add.bt('ip')}, ${add.bt('lat')}, ${add.bt('long')}, ${add.bt('country')}, ` +
                `${add.bt('region')}, ${add.bt('city')}, ${add.bt('zip')}, ` +
                `${add.bt('timestamp')}) ` +
                `VALUES (${add.cm(data.event_id)}, ${add.cm(data.event_creator_ip)}, ${add.cm(location.ll[0])}, ${add.cm(location.ll[1])}, ` +
                `${add.cm(location.country)}, ${add.cm(location.region)}, ${add.cm(location.city)}, ` +
                `${add.cm(location.zip)}, ${add.cm(data.event_time)}); `;

  console.log('LOCATION SQL: ', sql_loc);

  con.query(sql, (err, result) => {
    if (err) throw err;
    console.log(data);
  });

  con.query(sql_loc, (err, result) => {
    if (err) throw err;
    console.log(data);
  });
};
