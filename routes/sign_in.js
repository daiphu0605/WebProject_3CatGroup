const express = require('express');
const router = express.Router();
let passport = require('passport')
let LocalStrategy = require('passport-local').Strategy;
let signIn = require('../controllers/signIn')

router.get('/', signIn.signInPage);
router.post('/', signIn.signIn);

module.exports = router