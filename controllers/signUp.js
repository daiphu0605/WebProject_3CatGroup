let account =require('../models/account');
let passport = require('../passport/passport')

exports.signUpPage = (req,res,next) => {
    res.render('sign_up', {layout: 'layout_sign'});
}

exports.signUp = (req,res, next) =>{
    passport.authenticate('local-signup', function(err, user, info) {
        if (err)  {
            return next(err);
        }
        if (!user) {
            switch (info) {
                case "Username has existed":
                    return res.render('sign_up', {layout: 'layout_sign', ErrorUsername: info});
                case "Password not match":
                    return res.render('sign_up', {layout: 'layout_sign', ErrorConfirmPassword: info, username: req.body.username});
            }
        }
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.render('sign_up_fin', {layout: 'layout_sign'});
        });
    }) (req, res, next);
} 

