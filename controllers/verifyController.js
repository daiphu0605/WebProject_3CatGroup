let account =require('../models/account');
let passport = require('../passport/passport');



exports.index = async (req, res, next) => {
    var id = req.query.id || "";

    var result = account.verifyEmail(id);
    if(result != null)
    {
        var message = 'Your Email have been successfully verified';
        res.render('sign_up_fin',{layout: 'layout_sign', message});
    }
    else
    {
        var message = 'Bad request, something went wrong!';
        res.render('sign_up_fin',{layout: 'layout_sign', message});
    }
};