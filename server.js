const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const iplocation = require('iplocation');
const time = require('time');
const port = process.env.PORT || 5000;

// API calls
app.get('/init', (req, res) => {
  let ip = req.headers['x-forwarded-for'];
  let now = new time.Date();
  let info;

  iplocation(ip)
  .then(res => {
    info = res;
  })
  .catch(err => {
    console.error(err)
  })

  console.log(`The ballot was just accessed from ${ip} at ${now}. Potential
    location is ${info.city}, ${info.region_code}`);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alert.theballot@gmail.com',
      pass: process.env.SEND_MAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: 'alert.theballot@gmail.com',
    to: 'alert.theballot@gmail.com',
    subject: 'Ballot Accessed Alert',
    text: `The ballot was just accessed from ${ip} at ${now}. Potential
      location is ${info.city}, ${info.region_code}`
  };

  transporter.sendMail(mailOptions, function(error, info){
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent: ' + info.response);
    }
  });

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
