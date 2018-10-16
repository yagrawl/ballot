module.exports = function(app) {
  var ip = require('../controllers/createController');

  app.route('/ip')
    .get(ip.get_ip)
};
