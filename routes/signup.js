var express = require('express');
var router = express.Router();

router.get('/', (req, res, next) => {
    res.render('sign_up', {layout: 'layout_sign'});
});

router.post('/', (req, res) => {
    var SignUp = {
        username: req.body.username,
        password: req.body.pass,
    };
    res.render('sign_up_fin', {layout: 'layout_sign'});
});

router.get('/', (req, res, next) => {
     res.redirect('/');;
});

module.exports = router;