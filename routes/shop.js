const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

/* GET list of books. */
router.get('/', (req, res, next) => {
    shopController.Shop(req, res, next);
});

router.get('/:id', shopController.book);

module.exports = router;