const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_search_poll = (req, res) => {
  let term = '%' + req.query.find + '%';

  let sql = `SELECT ${add.bt('poll_id')} ` +
            `FROM ${database}.${add.bt('polls')} ` +
            `WHERE ${add.bt('question')} LIKE ${add.cm(term)}`;
  console.log('search SQL : ', sql);

  con.query(sql, function (err, result) {
    if (err) throw err;
    let search_polls = result.sort(add.compare).slice(0, 5);
    res.send({ details: search_polls });
  });
}
