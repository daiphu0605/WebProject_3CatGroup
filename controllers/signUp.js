//const account = require('../models/account');
const express = require('express');

    exports.SignUp = (req, res) => {
        var username = req.body.username;
        var password = req.body.pass;
        var repassword = req.body.repass;
        var ErrorUsername ="";
        var ErrorConfirmPass = "";
    
        if (repassword != password) {
            ErrorConfirmPass = ErrorConfirmPass + "Password is not matching.\n";
        }
    
        if (ErrorConfirmPass.length != 0 || ErrorUsername.length != 0) {
            res.render('sign_up', { layout: 'layout_sign', username, ErrorUsername, ErrorConfirmPass });
        }
    
        else {
            res.render('sign_up_fin', { layout: 'layout_sign' });
        }
    }


