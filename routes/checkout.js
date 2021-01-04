const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', (req, res, next) => {
    cartController.checkout(req, res, next);
});

module.exports = router;