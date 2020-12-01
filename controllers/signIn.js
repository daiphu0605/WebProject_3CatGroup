const express = require('express');
var account =require('../models/accounts')

exports.SignIn = async (req, res) => {
    var username = req.body.username;
    var pass = req.body.pass;
    var Error = "";
    if (await account.isAccount(username, pass))
    {
        return true;
    }
    else {
        Error = Error + "Wrong Password or Username.\n";

        res.render ('sign_in', {layout: 'layout_sign', username, Error});
        return false;
    }
}
