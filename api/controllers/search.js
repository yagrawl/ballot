const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_search_poll = (req, res) => {
  let tag = req.query.tag;
  let term = '%' + req.query.find + '%';

  let sql = '';

  if(tag === 'Select a Tag') {
    sql = `SELECT ${add.bt('poll_id')} ` +
          `FROM ${database}.${add.bt('polls')} ` +
          `WHERE ${add.bt('question')} LIKE ${add.cm(term)}`;
    console.log('search SQL : ', sql);
  } else {
    sql = `SELECT ${add.bt('poll_id')} ` +
          `FROM ${database}.${add.bt('tags')} ` +
          `WHERE ${add.bt('tag')}=${add.cm(tag)};`;
    console.log('search SQL with tag : ', sql);
  }

  con.query(sql, function (err, result) {
    if (err) throw err;
    let search_polls = result.sort(add.compare);;
    if(result.length > 15) {
      search_polls = result.sort(add.compare).slice(0, 15);
    } else {
      search_polls = result.sort(add.compare);
    }

    console.log(search_polls);

    res.send({ details: search_polls });
  });
}
