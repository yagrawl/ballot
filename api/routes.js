/*
 * Import a controller and add the defined routes.
 *  - add the route object as a local variable
 *  - follow app.route('/route/:id').CURD property
 */

module.exports = function(app) {
  let ip = require('./controllers/ip');
  let list = require('./controllers/list');
  let create = require('./controllers/create');
  let demo = require('./controllers/demo');
  let poll = require('./controllers/poll');
  let activity = require('./controllers/activity');

  app.route('/ip')
    .get(ip.get_ip);

  app.route('/api/list')
    .get(list.get_list);

  app.route('/api/create')
    .post(create.poll_details);

  app.route('/api/poll_init')
    .get(create.get_tags);

  app.route('/api/poll/:poll_id')
    .get(poll.get_poll);

  app.route('/api/demo')
    .post(demo.demo_create)
    .get(demo.demo_read)
    .put(demo.demo_update)
    .delete(demo.demo_delete);

  app.route('/api/activity')
    .post(activity.poll_vote)
    .get(activity.check_if_voted);

  app.route('/api/demo/table')
    .get(demo.demo_table);
};
