const db = require('../models/connection');
const add = require('../models/helpers');
const apiai = require('apiai');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.poll_details = (req, res) => {
  let data = req.body;
  let poll = add.cleanCreatePollData(data);

  get_tags(poll.question, poll.poll_id);

  let sql = `INSERT INTO ${database}` +
            `.${add.bt('polls')} (${add.bt('poll_id')}, ${add.bt('creator_id')}, ${add.bt('question')}, ${add.bt('creation_time')}, ` +
            `${add.bt('expiration_time')}, ${add.bt('feed_privacy')}, ${add.bt('analytics_privacy')}, ` +
            `${add.bt('ip_address')}, ${add.bt('option_1')}, ${add.bt('option_2')}, ${add.bt('option_3')}, ` +
            `${add.bt('option_4')}) VALUES (${add.cm(poll.poll_id)}, ${add.cm(poll.creator_id)}, ${add.cm(poll.question)}, ` +
            `${add.cm(poll.creation_time)}, ${add.cm(poll.expiration_time)}, ${add.cm(poll.feed_privacy)}, ` +
            `${add.cm(poll.analytics_privacy)}, ${add.cm(poll.ip_address)}, ${add.cm(poll.options[0])}, ` +
            `${add.cm(poll.options[1])}, ${add.cm(poll.options[2])}, ${add.cm(poll.options[3])});`;

    con.query(sql, (err, result) => {
      try {
        if (err) throw err;
      } catch(error) {
        if(error) {
          console.log('SQL Parsing Error');
        }
      }

    });

    res.send({ poll_id: poll.poll_id });
};

const get_tags = (input, poll_id) => {
  let app = apiai(process.env.DIALOGFLOW_CLIENT_ID);
  let request = app.textRequest(input, {
      sessionId: process.env.DIALOGFLOW_SESSION_ID
  });

  request.on('response', function(response) {
      let confidence = response.result.score;
      let tag = 'Misc';

      if(confidence > 0.2) {
        tag = response.result.metadata.intentName;
      }

      sql = `INSERT INTO ${database}` +
                `.${add.bt('tags')} (${add.bt('poll_id')}, ${add.bt('tag')}, ${add.bt('confidence')}) ` +
                `VALUES (${add.cm(poll_id)}, ${add.cm(tag)}, ${add.cm(confidence)});`;

      con.query(sql, (err, result) => {
        try {
          if (err) throw err;
        } catch(error) {
          if(error) {
            console.log('SQL Parsing Error');
          }
        }
      });
  });

  request.on('error', function(error) {
      console.log(error);
  });

  request.end();
}
