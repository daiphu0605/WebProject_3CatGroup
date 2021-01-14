const account = require('../models/account');
const md5 = require('md5');
const passport = require('../passport/passport');

exports.userPage = (req, res, next) => {
    if (typeof req.user === undefined) {
        return next();
    }
    return res.render('user', {layout: 'layout_user'});
}
exports.getInfo = function(req, res, next) {
    var username = req.user.username;
    account.getUserInfoByName(username, function(result){
        return res.send(result);
    })
}

exports.changePassPage = (req, res, next) => {
    if (typeof req.user === undefined) {
        return next();
    }
    return res.render('changepass', {layout: 'layout_user'});
}

exports.changeInfo = (req,res,next) => {
    var user = req.body.newuser;
    account.changeUserInfo(user, function(result) {
        return res.send(result);
    })
}

exports.changePass = (req,res,next) => {
    var oldPass = req.user.password;
    var reqPass = md5(req.body.oldPass);
    if (oldPass != reqPass) {
        return res.send({info: "Old password is not correct. Please try again."});
    }
    var newPass = req.body.newpass;
    account.changePass(req.user.username, newPass, function(result){
        if (result){
            var user = {
                username: req.user.username, 
                password: md5(newPass)
            }
            req.logIn(user);
            return res.send({info: "Password is successfully changed."});
        }
        return res.send({info: "Password change is failed."})
    });
}