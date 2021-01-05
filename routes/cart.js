const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/', (req, res, next) => {
    cartController.index(req, res, next);
});

router.get('/history', (req, res, next) => {
    cartController.history(req, res, next);
});

router.get('/history/:id', (req, res, next) => {
    cartController.historyid(req, res, next);
});

module.exports = router;