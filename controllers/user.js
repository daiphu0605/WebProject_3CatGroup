const account = require('../models/account');

exports.userPage = (req, res, next) => {
    if (typeof req.user === undefined) {
        return next();
    }
    account.getUserInfoByName(req.user.username, function(user) {
        return res.render('user', {layout: 'layout_user', user});
    });
}

exports.checkPassword = (req,res, next) => {
    if (typeof req.user === undefined) {
        return next();
    }
    var username = req.user.username;
    var password = req.body.oldPassword;
    account.checkPassword(username, password, function(result) {
        res.send(result);
    });
}
