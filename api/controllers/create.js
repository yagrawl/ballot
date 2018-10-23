const cryptoRandomString = require('crypto-random-string');
const SQL = require('sql-template-strings');
const db = require('../models/connection');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";
const polls = "`polls`"

exports.poll_details = (req, res) => {
  let data = req.body;
  let poll = cleanCreatePollData(data);

  let sql = `INSERT INTO ${database}` +
            `.${at('polls')} (${at('poll_id')}, ${at('question')}, ${at('creation_time')}, ` +
            `${at('expiration_time')}, ${at('feed_privacy')}, ${at('analytics_privacy')}, ` +
            `${at('ip_address')}, ${at('option_1')}, ${at('option_2')}, ${at('option_3')}, ` +
            `${at('option_4')}) VALUES (${cm(poll.poll_id)}, ${cm(poll.question)}, ` +
            `${cm(poll.creation_time)}, ${cm(poll.expiration_time)}, ${cm(poll.feed_privacy)}, ` +
            `${cm(poll.analytics_privacy)}, ${cm(poll.ip_address)}, ${cm(poll.options[0])}, ` +
            `${cm(poll.options[1])}, ${cm(poll.options[2])}, ${cm(poll.options[3])});`;
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(data);
    });

    res.send({ poll_id: poll.poll_id });
};

exports.get_tags = (req, res) => {
  console.log(req.body);
}

const cleanCreatePollData = (data) => {
  let output = {};
  let options_cleaner = data.details.options;
  output.options = [];

  for(let i = 0; i < options_cleaner.length; i++) {
    output.options.push(options_cleaner[i].content);
  }

  output.poll_id = cryptoRandomString(6);
  output.question = data.details.question;

  for(let i = 0; i <= 4 - output.options.length; i++) {
    output.options.push('NULL');
  }

  output.creation_time = data.attributes.creation_time;
  output.expiration_time = data.attributes.expiration_time;
  output.feed_privacy = data.attributes.feed_privacy;
  output.analytics_privacy = data.attributes.analytics_privacy;
  output.ip_address = data.attributes.ip_address;

  return output;
}

//this function adds backtick to strings
const at = (input) => {
  let output = "`" + input + "`";
  return output;
}

const cm = (input) => {
  let output = "'" + input + "'";
  return output;
}
