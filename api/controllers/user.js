const SQL = require('sql-template-strings');
const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.log_user = (req, res) => {
  let data = req.body;
  let check_sql = `SELECT * from ${database}.${add.bt('users')} as user ` +
                  `WHERE user.user_id = ${add.cm(data.id)};`;

  con.query(check_sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    if(result.length === 0) {
      let sql = `INSERT INTO ${database}` +
                `.${add.bt('users')} (${add.bt('user_id')}, ${add.bt('name')}, ${add.bt('profile_picture')}, ` +
                `${add.bt('email')}, ` +
                `${add.bt('log_count')}) VALUES (${add.cm(data.id)}, ${add.cm(data.name)}, ` +
                `${add.cm(data.profile_picture)}, ${add.cm(data.email)}, ${add.cm(1)});`
      con.query(sql, (err, result) => {
        try {
          if (err) throw err;
        } catch(error) {
          if(error) {
            console.log('SQL Parsing Error');
          }
        }

        let data = result[1];
      });
    } else {
      let log_count = result[0].log_count + 1;
      let user_id = result[0].user_id;
      let update_sql = `UPDATE ${database}.${add.bt('users')} SET ` +
                       `${add.bt('log_count')} = ${add.cm(log_count)} ` +
                       `WHERE (${add.bt('user_id')} = ${add.cm(user_id)});`

     con.query(update_sql, (err, result) => {
       try {
         if (err) throw err;
       } catch(error) {
         if(error) {
           console.log('SQL Parsing Error');
         }
       }

       let data = result;
     });
    }

    res.end();
  });
}

exports.log_user_ip = (req, res) => {
  let data = req.body;
  let ip = req.headers['x-forwarded-for'].toString().split(',')[0];

  let check_sql_ip = `SELECT * from ${database}.${add.bt('ips')} as ips ` +
                     `WHERE ips.user_id = ${add.cm(data.id)} AND ` +
                     `ips.ip_address = ${add.cm(ip)};`;

  con.query(check_sql_ip, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

   if(result.length === 0) {
     let sql = `INSERT INTO ${database}` +
               `.${add.bt('ips')} (${add.bt('user_id')}, ${add.bt('ip_address')}, ` +
               `${add.bt('log_count')}) VALUES (${add.cm(data.id)}, ${add.cm(ip)}, ` +
               `${add.cm(1)});`;

     con.query(sql, (err, result) => {
       try {
         if (err) throw err;
       } catch(error) {
         if(error) {
           console.log('SQL Parsing Error');
         }
       }

       let data = result[1];
     });
   } else {
     let log_count = result[0].log_count + 1;
     let user_id = result[0].user_id;
     let update_sql = `UPDATE ${database}.${add.bt('ips')} SET ` +
                      `${add.bt('log_count')} = ${add.cm(log_count)} ` +
                      `WHERE (${add.bt('user_id')} = ${add.cm(user_id)});`

    con.query(update_sql, (err, result) => {
      try {
        if (err) throw err;
      } catch(error) {
        if(error) {
          console.log('SQL Parsing Error');
        }
      }

      let data = result;
    });
   }

   res.end();
 });
}

exports.get_user = (req, res) => {
  let user_id = req.params.user_id;
  let data = {};
  let sql = `SELECT * from ${database}.${add.bt('users')} as user ` +
            `WHERE user.user_id = ${add.cm(user_id)};`;
  let get_polls_sql = `SELECT * from ${database}.${add.bt('polls')} as polls ` +
                      `WHERE polls.creator_id = ${add.cm(user_id)};`;

  con.query(sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    let user_details = result[0];
    data.details = user_details;

    con.query(get_polls_sql, function (err, result) {
      try {
        if (err) throw err;
      } catch(error) {
        if(error) {
          console.log('SQL Parsing Error');
        }
      }

      let user_polls = [];

      if(result.length < 5) {
        user_polls = result;
      } else {
        user_polls = result.slice(0, 5);
      }

      data.polls = user_polls;

      res.send({details: data});
    });
  });
}

exports.get_user_ip = (req, res) => {
  let user_id = req.params.user_id;
  let data = {};
  let sql = `SELECT * from ${database}.${add.bt('ips')} as ips ` +
            `WHERE ips.user_id = ${add.cm(user_id)};`;

  con.query(sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    data = result;
    res.send({details: data});
  });
}
