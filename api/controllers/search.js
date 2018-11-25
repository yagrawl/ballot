const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_search_query_poll = (req, res) => {
    let term = '%' + req.query.find.replace(/'/g, "§") + '%';

    let sql = `SELECT ${add.bt('poll_id')} ` +
            `FROM ${database}.${add.bt('polls')} ` +
            `WHERE ${add.bt('question')} LIKE ${add.cm(term)}`;
      console.log('search SQL : ', sql);

    con.query(sql, function (err, result) {
      try {
        if (err) throw err;
      } catch(error) {
        if(error) {
          console.log('SQL Parsing Error');
        }
      }

      try {
        let search_polls = result.sort(add.compare);;
        if(result.length > 15) {
          search_polls = result.sort(add.compare).slice(0, 15);
        } else {
          search_polls = result.sort(add.compare);
        }

        console.log(search_polls);

        res.send({ details: search_polls });
      } catch(error) {
        if(error instanceof TypeError) {
          console.log('Type Error Occured');
        } else {
          console.log('Unknown Error Occured');
        }
      }
    });
  }

exports.get_search_tag_poll = (req, res) => {
  let tag = req.query.tag;
  let sql = `SELECT ${add.bt('poll_id')} ` +
            `FROM ${database}.${add.bt('tags')} ` +
            `WHERE ${add.bt('tag')}=${add.cm(tag)};`;

  con.query(sql, function (err, result) {
    try {
      if (err) throw err;
    } catch(error) {
      if(error) {
        console.log('SQL Parsing Error');
      }
    }

    try {
      let search_polls = result.sort(add.compare);;
      if(result.length > 15) {
        search_polls = result.sort(add.compare).slice(0, 15);
      } else {
        search_polls = result.sort(add.compare);
      }

      console.log(search_polls);

      res.send({ details: search_polls });
    } catch(error) {
      if(error instanceof TypeError) {
        console.log('Type Error Occured');
      } else {
        console.log('Unknown Error Occured');
      }
    }
  });
}
