const express = require('express');
var account =require('../models/accounts')

exports.SignIn = (req, res) => {
    var username = req.body.username;
    var pass = req.body.pass;
    var Error = "";
    if (account.isAccount(username, pass))
    {
        return true;
    }
    else {
        Error = Error + "Wrong Password or Username.\n";
        res.render ("sign_in", {layout: 'layout_sign', Error});
        return false;
    }
}