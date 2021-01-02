const express = require('express');
const router = express.Router();
let signUp = require('../controllers/signUp')

router.get('/', signUp.signUpPage);
router.post('/', signUp.signUp);

module.exports = router;