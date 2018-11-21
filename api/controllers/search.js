const db = require('../models/connection');
const add = require('../models/helpers');
const con = db.con;
const database = process.env.DB_NAME || "`ballot`";

exports.get_search_poll = (req, res) => {
  console.log(req.body);
}
