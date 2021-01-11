let account = require('../models/account')
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  async function (req, username, password, done) {
    let email = req.body.email;
    let name = req.body.lastName + " " + req.body.firstName;
    let host = req.get('host');
    await account.AddAccount(username, password, email, name, done);
    await account.sentVerifyEmail(username, host, email);
  }));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  function(req, username, password, done) {
    account.isAccount(username, password, done);
}));


passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(function(username, done) {
    account.getUserbyName(username, done);
  });

module.exports = passport;