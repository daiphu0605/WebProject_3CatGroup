const express = require('express');
var account =require('../models/accounts')

    exports.SignUp = (req, res) => {
        var username = req.body.username;
        var password = req.body.pass;
        var repassword = req.body.repass;
        var ErrorUsername ="";
        var ErrorConfirmPassword = "";

        if (account.FindUserName(username))
        {
            ErrorUsername = ErrorUsername + "Username is existed.\n";
        }
    
        if (repassword != password) {
            ErrorConfirmPassword = ErrorConfirmPassword + "Password is not matching.\n";
        }
    
        if (ErrorConfirmPass.length != 0 || ErrorUsername.length != 0) {
            res.render('sign_up', { layout: 'layout_sign', username, ErrorUsername, ErrorConfirmPassword });
        }
    
        else {
            account.AddAccount(username, password);
            res.render('sign_up_fin', { layout: 'layout_sign' });
        }
    }


