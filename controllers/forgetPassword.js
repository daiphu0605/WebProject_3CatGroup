let account = require('../models/account');

exports.forgetPage = (req, res, next) =>{
    res.render('forget_pass', {layout: 'layout_sign'});
}

exports.forgetHandler = (req, res, next) => {
    var email = req.body.email;
    account.isEmail(email, (result) => {
        if (result) { 
            res.render('forget_pass', {layout: 'layout_sign', annouce: "New password is 123"});
            res.redirect("/signin");
        }
        else {
            res.render('forget_pass', {layout: 'layout_sign', ErrorMessage: "Email is not existed"});
        }
    });
}