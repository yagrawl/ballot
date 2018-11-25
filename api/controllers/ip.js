const request = require('request');

exports.get_ip = (req, res) => {
  let ip = req.headers['x-forwarded-for'].toString().split(',')[0];
  res.send({ express: ip });
};

exports.check_vpn = (req, res) => {
  let ip = req.headers['x-forwarded-for'].toString().split(',')[0];
  
  request({
        method: 'GET',
        url: `http://v2.api.iphub.info/ip/${ip}`,
        headers: {
            'X-Key': process.env.IPHUB_API_KEY
        }
    },
    function (error, response, body) {
        let ip_data = JSON.parse(body);
        let vpn = false;

        if(ip_data.block === 1) {
          vpn = true;
        }

        res.send({is_vpn: vpn});
    });
};
