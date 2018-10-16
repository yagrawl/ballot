const express = require('express');
const path = require('path');
const app = express();
const nodemailer = require('nodemailer');
const iplocation = require('iplocation');
const time = require('time');

const port = process.env.PORT || 5000;

let routes = require('./api/routes.js');
routes(app);

app.get('/api/list', (req, res) => {
  let list = ["item1", "item2", "item3"];
  res.json(list);
});

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, 'Client/build')));

  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'Client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
