const express = require('express');
const path = require('path');
const app = express();
const twilio = require('twilio');
const port = process.env.PORT || 5000;

let twilio_account_sid = process.env.TWILIO_ACCOUNT_SID;
let twilio_auth_token = process.env.TWILIO_AUTH_TOKEN;

var twilio_client = new twilio(twilio_account_sid, twilio_auth_token);

// API calls
app.get('/init', (req, res) => {
  let ip = req.connection.remoteAddress;
  twilio_client.messages.create({
      body: `Request Access from ${ip}`,
      to: '+12178191201',
      from: '+13128001785'
  })
  .then((message) => console.log(message.sid));
  res.send({ express: 'The Ballot' });
});

if (process.env.NODE_ENV === 'production') {

  // Serve any static files
  app.use(express.static(path.join(__dirname, 'Client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'Client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
