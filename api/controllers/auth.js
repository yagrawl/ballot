const passport = require('passport');
const FacebookStrategy = require('passport-facebook');

const fb_credentials = {
  clientID: process.env.FACEBOOK_APP_ID,
  clientASecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: '/auth/facebook/callback'
};

const fb_callback = function(accessToken, refreshToken, profile, cb){
  console.log(accessToken, refreshToken, profile);
};

passport.use(new FacebookStrategy(fb_credentials, fb_callback));

exports.get_auth = (req, res) => {
  passport.authenticate('facebook');
}

exports.get_callback = (req, res) => {
  passport.authenticate('facebook', { successRedirect: '/',
                                      failureRedirect: '/login' });
}
