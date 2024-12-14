const express = require('express');
const { getCart } = require('../controllers/cart');

const router = express.Router();

// GET: /cart/items
router.get('/items', getCart);

module.exports = router;