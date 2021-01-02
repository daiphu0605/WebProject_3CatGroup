let account = require('../models/account')
let md5 = require('md5');
let passport = require('passport');
let LocalStrategy = require('passport-local').Strategy;

passport.use('local-signup', new LocalStrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
  },
  async function (req, username, password, done) {
    account.isUsername(username).then((isUser) => {
      if (isUser) {
        return done(null, false, "Username has existed")
      }
      if (req.body.repassword !== password) {
        return done(null, false, "Password not match");
      }
      account.AddAccount(username, password).then((result) => {
        var user = {username: username, password: md5(password)};
        return done(null, user);
      });
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


passport.serializeUser(function(user, done) {
    done(null, user.username);
  });
  
  passport.deserializeUser(function(username, done) {
    account.getUserByName(username).then((result) => {
      return done(null, result);
    });
  });

module.exports = passport;