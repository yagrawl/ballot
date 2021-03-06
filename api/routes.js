/*
 * Import a controller and add the defined routes.
 *  - add the route object as a local variable
 *  - follow app.route('/route/:id').CURD property
 */

module.exports = function(app) {
  let ip = require('./controllers/ip');
  let create = require('./controllers/create');
  let poll = require('./controllers/poll');
  let activity = require('./controllers/activity');
  let details = require('./controllers/details');
  let feed = require('./controllers/feed');
  let users = require('./controllers/user');
  let stats = require('./controllers/stats');
  let search = require('./controllers/search');
  let event = require('./controllers/event');

  app.route('/ip')
    .get(ip.get_ip);

  app.route('/ip/check_vpn')
    .get(ip.check_vpn);

  app.route('/api/create')
    .post(create.poll_details);

  app.route('/api/poll/:poll_id')
    .get(poll.get_poll);

  app.route('/api/poll/tag/:poll_id')
    .get(poll.get_tag);

  app.route('/api/poll/archieve/:poll_id')
    .put(poll.archieve_poll);

  app.route('/api/activity')
    .post(activity.poll_vote)
    .get(activity.check_if_voted);

  app.route('/api/details/:poll_id')
    .get(details.get_vote_details);

  app.route('/api/activity/analytics/:poll_id')
    .get(activity.get_analytics);

  app.route('/api/activity/pre_analytics/:poll_id')
    .get(activity.get_pre_analytics);

  app.route('/api/feed')
    .get(feed.get_feed_poll);

  app.route('/api/user/new')
    .post(users.log_user);

  app.route('/api/user/ip/new')
    .post(users.log_user_ip);

  app.route('/api/user/:user_id')
    .get(users.get_user);

  app.route('/api/user/ip/:user_id')
    .get(users.get_user_ip);

  app.route('/api/stats')
    .get(stats.get_stats);

  app.route('/api/search/query/')
    .get(search.get_search_query_poll);

  app.route('/api/search/tag/')
    .get(search.get_search_tag_poll);

  app.route('/api/google_maps_key')
    .get(stats.get_map_key);

  app.route('/api/event')
    .post(event.add_event);
};
