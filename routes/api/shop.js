const express = require('express');
const router = express.Router();
const shopController = require('../../controllers/api/shopController');

/* GET list of books. */
router.get('/book-list', (req, res, next) => {
    shopController.bookapi(req, res, next);
});

router.get('/page', (req, res, next) => {
    shopController.pageapi(req, res, next);
});

/* GET list of books. */
router.get('/book-list-old', (req, res, next) => {
    shopController.oldbookapi(req, res, next);
});

module.exports = router;