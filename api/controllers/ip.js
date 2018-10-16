exports.get_ip = (req, res) => {
  let ip = req.headers['x-forwarded-for'].toString();
  res.send({ express: ip });
};
