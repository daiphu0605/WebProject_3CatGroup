const express = require('express');
var account =require('../models/accounts')

exports.SignIn = async (req, res) => {
    var username = req.body.username;
    var pass = req.body.pass;
    var Error = "";
    var bool = await account.isAccount(username, pass);
    if (bool)
    {
         res.redirect('/shop');
    }
    else {
        Error = Error + "Wrong Password or Username.\n";

        res.render ('sign_in', {layout: 'layout_sign', username, Error});
    }
}