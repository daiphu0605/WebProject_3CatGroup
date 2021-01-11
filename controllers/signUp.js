let account =require('../models/account');
let passport = require('../passport/passport');

exports.signUpPage = (req,res,next) => {
    res.render('sign_up', {layout: 'layout_sign'});
}

exports.signUp = (req,res, next) =>{
    passport.authenticate('local-signup', function(err, user, info) {
        if (err)  {
            return next(err);
        }
        req.login(user, function(err) {
            if (err) { return next(err); }
            return;
        });
    }) (req, res, next);
}

exports.checkUsername = (req, res, next) => {
    var Username = req.body.username;
    account.isUsername(Username, (result) =>{
        res.send({is: result});
    });
}

exports.checkEmail = (req, res, next) => {
    var Email = req.body.email;
    account.isEmail(Email, (result) =>{
        res.send({is: result});
    });
}

