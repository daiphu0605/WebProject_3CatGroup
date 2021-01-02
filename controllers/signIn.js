let account = require('../models/account')
let passport = require('../passport/passport');



exports.signInPage = (req,res,next) => {
    res.render('sign_in',{layout: 'layout_sign'});
}

exports.signIn = (req,res,next) => {
    passport.authenticate('local-signin', function (err, user, info) {
        if(err) {
            return next(err);
        }
        if (!user) {
            return res.render('sign_in',{layout: 'layout_sign', Error: info});
        }
        console.log(user.username);
        req.login(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/shop');
        });
    })(req, res, next);
}