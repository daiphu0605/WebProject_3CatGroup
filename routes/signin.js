var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('sign_in', {layout: 'layout_sign'});
});

router.post('/', (req, res) => {
    var SignIn = {
        username: req.body.username,
        password: req.body.pass,
    };
     res.redirect('/');
});

module.exports = router;