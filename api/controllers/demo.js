exports.demo_create = (req, res) => {
  console.log(req.body);
};

exports.demo_read = (req, res) => {
  console.log(req.query);
  res.send({ value: 'yash' });
}
