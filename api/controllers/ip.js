exports.get_ip = (req, res) => {
  let ip = req.headers['x-forwarded-for'].toString().split(',')[0];
  res.send({ express: ip });
};
