const express = require('express');
const router = express.Router();
const forget = require('../controllers/forgetPassword')

router.get('/', forget.forgetPage);
router.post('/', forget.forgetHandler);

module.exports = router;