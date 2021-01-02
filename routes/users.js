var express = require('express');
var router = express.Router();
var passport = require('passport')

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/', (req, res) =>{
  req.logout();
  res.redirect('/');
})
module.exports = router;
