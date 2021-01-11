var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

/* GET users listing. */
router.get('/', user.userPage);

router.get('/', (req, res) =>{
  req.logout();
  res.redirect('/');
})
module.exports = router;
