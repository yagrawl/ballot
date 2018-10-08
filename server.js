const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const port = process.env.PORT || 5000;

// API calls
app.get('/init', (req, res) => {
  let ip = req.headers['x-forwarded-for'];
  console.log(`Request Access from ${ip}`);

  let transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'alert.theballot@gmail.com',
      pass: process.env.SEND_MAIL_PASSWORD
    }
  });

  var mailOptions = {
    from: 'alert.theballot@gmail.com',
    to: 'akhilkandimalla1997@gmail.com',
    subject: 'Ballot Accessed Alert',
    text: `The ballot was just accessed from ${ip}`
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
