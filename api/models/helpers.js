const cryptoRandomString = require('crypto-random-string');

// Add backticks to the input string
exports.bt = (input) => {
  let output = "`" + input + "`";
  return output;
}

// Add commas to the input string
exports.cm = (input) => {
  let output = "'" + input + "'";
  return output;
}

exports.compare = (a, b) => {
  if(a.act_count < b.act_count) {
    return 1;
  }
  if(a.act_count > b.act_count) {
    return -1;
  }
  return 0;
}

exports.cleanCreatePollData = (data) => {
  let output = {};
  let options_cleaner = data.details.options;
  output.options = [];

  for(let i = 0; i < options_cleaner.length; i++) {
    output.options.push(options_cleaner[i].content);
  }

  output.poll_id = cryptoRandomString(6);
  output.question = data.details.question;

  for(let i = 0; i <= 4 - output.options.length; i++) {
    output.options.push('NULL');
  }

  output.creation_time = data.attributes.creation_time;
  output.expiration_time = data.attributes.expiration_time;
  output.feed_privacy = data.attributes.feed_privacy;
  output.analytics_privacy = data.attributes.analytics_privacy;
  output.ip_address = data.attributes.ip_address;
  output.creator_id = data.attributes.creator_id;

  return output;
}
