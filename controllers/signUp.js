let account =require('../models/account');
let passport = require('../passport/passport')

exports.signUpPage = (req,res,next) => {
    res.render('sign_up', {layout: 'layout_sign'});
}

exports.signUp = (req,res, next) =>{
    passport.authenticate('local-signup', function(err, username, info) {
        if (err)  {
            return next(err);
        }
        if (!username) {
            return res.render('sign_up', {layout: 'layout_sign', Error: info});
        }
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.render('sign_up_fin', {layout: 'layout_sign'});
        });
    }) (req, res, next);
} 

exports.signUpFin = (req, res, next) => {
     res.redirect('/shop');
}