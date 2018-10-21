/*
 * Import a controller and add the defined routes.
 *  - add the route object as a local variable
 *  - follow app.route('/route/:id').CURD property
 */

module.exports = function(app) {
  let ip = require('./controllers/ip');
  let list = require('./controllers/list');
  let pollDetails = require('./controllers/pollDetails');
  let demo = require('./controllers/demo');

  app.route('/ip')
    .get(ip.get_ip);

  app.route('/api/list')
    .get(list.get_list);

  app.route('/create/details')
    .post(pollDetails.post_details);

  app.route('/api/demo')
    .post(demo.demo_create)
    .get(demo.demo_read);
};
