const express = require('express');
const router = express.Router();
let signUp = require('../controllers/signUp')

router.get('/', signUp.signUpPage);
router.post('/', signUp.signUp);
router.get('/shop', signUp.signUpFin);

module.exports = router;