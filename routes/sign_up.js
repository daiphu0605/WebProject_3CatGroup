const express = require('express');
const router = express.Router();
let signUp = require('../controllers/signUp')

router.get('/', signUp.signUpPage);
router.post('/', signUp.signUp);
router.post('/checkinguser', signUp.checkUsername);
router.post('/checkingemail', signUp.checkEmail);

module.exports = router;