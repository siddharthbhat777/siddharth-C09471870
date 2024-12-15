const express = require('express');
const { getCart, updateCart } = require('../controllers/cart');

const router = express.Router();

// GET: /cart/items
router.get('/items/:userId', getCart);

// PUT: /cart/update-item/:userId/:pizzaId
router.put('/update-item/:userId/:pizzaId', updateCart);

module.exports = router;