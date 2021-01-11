let account =require('../models/account');
let passport = require('../passport/passport');



exports.index = async (req, res, next) => {
    var id = req.query.id || "";

    var result = account.verifyEmail(id);
    if(result != null)
    {
        res.end("<h1>Your Email have been successfully verified");
    }
    else
    {
        res.end("<h1>Bad Request</h1>");
    }
};