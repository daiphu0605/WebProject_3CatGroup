var express = require('express');
var router = express.Router();
var signIn = require('../controllers/signIn')

router.get('/', (req, res, next) => {
    res.render('sign_in', {layout: 'layout_sign'});
});

router.post('/', (req, res) => {
    signIn.SignIn(req,res)
});

module.exports = router;