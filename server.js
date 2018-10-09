const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const iplocation = require('iplocation');
const time = require('time');

const port = process.env.PORT || 5000;

// API calls
app.get('/init', (req, res) => {
  let ip = req.headers['x-forwarded-for'].toString();
  res.send({ express: ip });
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
