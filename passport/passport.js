let account = require('../models/account')
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
  },
  async function (username, password, done) {
    account.isUsername(username).then((user) => {
      if (user) {
        return done(null, false, "Username has existed")
      }
      account.AddAccount(username, password);
      return (null, username);
    });
  }
));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password'
},
async function(username, password, done) {
    account.isAccount(username, password).then((user) =>{
      if (typeof (user) === 'string'){
        return done(null, false, user);
      }
      return done(null, user);
    });
}));


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