const express = require('express');
const router = express.Router();
let verify = require('../controllers/verifyController');

router.get('/', verify.index);

module.exports = router;