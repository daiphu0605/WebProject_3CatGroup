let account = require('../models/account')
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async function (username, password, done) {
    var user = account.isUsername(username);
    if (user) {
        return done(null, false, "Username has existed")
    }
    account.AddAccount(username, password);
    return (null, username);
  }
));



passport.serializeUser(function(username, done) {
    done(null, username);
  });
  
  passport.deserializeUser(function(username, done) {
    var result = account.getUserByName(username);
    if (!result) {
        return done(null, result);
    }
    return (null, result);
  });

module.exports = passport;