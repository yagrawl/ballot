const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.poll_details = (req, res) => {
  let data = req.body;
  let poll = add.cleanCreatePollData(data);
  console.log('poll data: ', poll);
  let sql = `INSERT INTO ${database}` +
            `.${add.bt('polls')} (${add.bt('poll_id')}, ${add.bt('creator_id')}, ${add.bt('question')}, ${add.bt('creation_time')}, ` +
            `${add.bt('expiration_time')}, ${add.bt('feed_privacy')}, ${add.bt('analytics_privacy')}, ` +
            `${add.bt('ip_address')}, ${add.bt('option_1')}, ${add.bt('option_2')}, ${add.bt('option_3')}, ` +
            `${add.bt('option_4')}) VALUES (${add.cm(poll.poll_id)}, ${add.cm(poll.creator_id)}, ${add.cm(poll.question)}, ` +
            `${add.cm(poll.creation_time)}, ${add.cm(poll.expiration_time)}, ${add.cm(poll.feed_privacy)}, ` +
            `${add.cm(poll.analytics_privacy)}, ${add.cm(poll.ip_address)}, ${add.cm(poll.options[0])}, ` +
            `${add.cm(poll.options[1])}, ${add.cm(poll.options[2])}, ${add.cm(poll.options[3])});`;
    console.log('Create Poll SQL: ', sql);
    con.query(sql, (err, result) => {
      if (err) throw err;
      console.log(data);
    });

    res.send({ poll_id: poll.poll_id });
};

exports.get_tags = (req, res) => {
  console.log(req.body);
}
