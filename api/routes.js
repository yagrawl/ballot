/*
 * Import a controller and add the defined routes.
 *  - add the route object as a local variable
 *  - follow app.route('/route/:id').CURD property 
 */

module.exports = function(app) {
  let ip = require('./controllers/ip');
  let list = require('./controllers/list');

  app.route('/ip')
    .get(ip.get_ip);

  app.route('/api/list')
    .get(list.get_list);
};
