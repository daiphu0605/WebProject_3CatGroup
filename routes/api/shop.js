const express = require('express');
const router = express.Router();
const shopController = require('../../controllers/api/shopController');

router.get('/book-list', (req, res, next) => {
    shopController.bookapi(req, res, next);
});

router.get('/page', (req, res, next) => {
    shopController.pageapi(req, res, next);
});

router.get('/book-list-old', (req, res, next) => {
    shopController.oldbookapi(req, res, next);
});

router.get('/review', (req, res, next) => {
    shopController.addreviewapi(req, res, next);
});

router.get('/change-review', (req, res, next) => {
    shopController.reviewapi(req, res, next);
});

module.exports = router;