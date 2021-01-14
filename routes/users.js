var express = require('express');
var router = express.Router();
var user = require('../controllers/user');

/* GET users listing. */
router.get('/', user.userPage);

router.get('/signout', (req, res) =>{
  req.logout();
  res.redirect('/');
})
router.get('/changepass',user.changePassPage);
router.get('/changeinfo', user.userPage);
router.post('/getinfo',user.getInfo);
router.post('/changinginfo', user.changeInfo);
router.post('/changingpass', user.changePass);
router.get('/js', (req,res, next) =>{
  return;
});
module.exports = router;

