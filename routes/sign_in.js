const express = require('express');
const router = express.Router();
let signIn = require('../controllers/signIn')

router.get('/', signIn.signInPage);
router.post('/', signIn.signIn);

module.exports = router