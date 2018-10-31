const SQL = require('sql-template-strings');
const db = require('../models/connection');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.log_user = (req, res) => {
  let data = req.body;
  console.log('log user (data):', data);

  let check_sql = `SELECT * from ${database}.${at('users')} as user ` +
                  `WHERE user.user_id = ${cm(data.id)};`;
  con.query(check_sql, function (err, result) {
    if (err) throw err;
    if(result.length === 0) {
      let sql = `INSERT INTO ${database}` +
                `.${at('users')} (${at('user_id')}, ${at('name')}, ${at('profile_picture')}, ` +
                `${at('email')}, ` +
                `${at('log_count')}) VALUES (${cm(data.id)}, ${cm(data.name)}, ` +
                `${cm(data.image)}, ${cm(data.email)}, ${cm(1)});`
      con.query(sql, (err, result) => {
        if (err) throw err;
        let data = result[1];
        console.log('log user (insert):', data);
      });
    } else {
      console.log('Entry already exists');
      let log_count = result[0].log_count + 1;
      let user_id = result[0].user_id;
      let update_sql = `UPDATE ${database}.${at('users')} SET ` +
                       `${at('log_count')} = ${cm(log_count)} ` +
                       `WHERE (${at('user_id')} = ${cm(user_id)});`
     con.query(update_sql, (err, result) => {
       if (err) throw err;
       let data = result;
       console.log('log user (update):', data);
     });
    }
    res.end();
  });
}

exports.get_user = (req, res) => {
  let user_id = req.params.user_id;
  console.log('User ID: ', user_id);
  let data = {};

  let sql = `SELECT * from ${database}.${at('users')} as user ` +
            `WHERE user.user_id = ${cm(user_id)};`;
  let get_polls_sql = `SELECT * from ${database}.${at('polls')} as polls ` +
                      `WHERE polls.creator_id = ${cm(user_id)};`;
  console.log(sql);
  con.query(sql, function (err, result) {
    if (err) throw err;
    let user_details = result[0];
    console.log('User Details : ', user_details);
    data.details = user_details;
    con.query(get_polls_sql, function (err, result) {
      if (err) throw err;
      let user_polls = [];
      if(result.length < 5) {
        user_polls = result;
      } else {
        user_polls = result.slice(0, 5);
      }
      console.log('User Polls : ', user_polls);
      data.polls = user_polls;
      console.log('User : ', data);
      res.send({details: data});
    });
  });
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
