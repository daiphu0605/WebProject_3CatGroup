const express = require('express');
const router = express.Router();
const cartController = require('../../controllers/api/cartController');

router.get('/get-cart', (req, res, next) => {
    cartController.index(req, res, next);
});

router.get('/save-cart', (req, res, next) => {
    cartController.saveCart(req, res, next);
});

router.get('/add-to-cart', (req, res, next) => {
    cartController.addCart(req, res, next);
});

router.get('/remove', (req, res, next) => {
    cartController.removeCart(req, res, next);
});

router.get('/increase', (req, res, next) => {
    cartController.increaseCart(req, res, next);
});

router.get('/reduce', (req, res, next) => {
    cartController.reduceCart(req, res, next);
});

module.exports = router;