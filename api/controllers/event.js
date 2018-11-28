const db = require('../models/connection');
const add = require('../models/helpers');
const cryptoRandomString = require('crypto-random-string');
const geoip = require('geo-from-ip');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.add_event = (req, res) => {
  let data = req.body;
  data.event_creator_ip = req.headers['x-forwarded-for'].toString().split(',')[0];
  data.event_id = cryptoRandomString(10);
  let location = geoip.allData(data.event_creator_ip);
  let sql, sql_loc;

  try {
    sql = `INSERT INTO ${database}` +
          `.${add.bt('events')} (${add.bt('event_id')}, ${add.bt('event_name')}, ${add.bt('event_time')}, ${add.bt('event_creator_ip')}, ${add.bt('event_creator_id')}, ` +
          `${add.bt('event_route')}, ${add.bt('browser')}, ${add.bt('browser_version')}, ` +
          `${add.bt('engine')}, ${add.bt('os')}, ${add.bt('os_version')}) ` +
          `VALUES (${add.cm(data.event_id)}, ${add.cm(data.event_name)}, ${add.cm(data.event_time)}, ${add.cm(data.event_creator_ip)}, ` +
          `${add.cm(data.event_creator_id)}, ${add.cm(data.event_route)}, ${add.cm(data.event_device.browser)}, ` +
          `${add.cm(data.event_device.browser_version)}, ${add.cm(data.event_device.engine)}, ${add.cm(data.event_device.os)}, ` +
          `${add.cm(data.event_device.os_version)});`;

    sql_loc = `INSERT INTO ${database}` +
              `.${add.bt('location')} (${add.bt('location_id')}, ${add.bt('ip')}, ${add.bt('lat')}, ${add.bt('long')}, ${add.bt('country')}, ` +
              `${add.bt('region')}, ${add.bt('city')}, ${add.bt('zip')}, ` +
              `${add.bt('timestamp')}) ` +
              `VALUES (${add.cm(data.event_id)}, ${add.cm(data.event_creator_ip)}, ${add.cm(location.location.latitude)}, ${add.cm(location.location.longitude)}, ` +
              `${add.cm(location.code.country)}, ${add.cm(location.code.continent)}, ${add.cm(location.city)}, ` +
              `${add.cm(location.postal)}, ${add.cm(data.event_time)}); `;
  } catch(error) {
    console.log('Location IP API error');
  }

  con.query(sql, (err, result) => {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }
  });

  con.query(sql_loc, (err, result) => {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }
  });
};
