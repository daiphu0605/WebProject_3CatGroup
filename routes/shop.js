const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shopController');

/* GET list of books. */
router.get('/', shopController.index);

router.get('/:id', shopController.book);

module.exports = router;