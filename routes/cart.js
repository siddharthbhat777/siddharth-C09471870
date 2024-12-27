const express = require('express');
const { getCart, updateCart, deleteCartItem } = require('../controllers/cart');

const router = express.Router();

// GET: /cart/items
router.get('/items/:userId', getCart);

// PUT: /cart/update-item/:userId/:pizzaId
router.put('/update-item/:userId/:pizzaId', updateCart);

// DELETE: /cart/remove-item/:userId/:pizzaId
router.delete('/remove-item/:userId/:pizzaId', deleteCartItem);

module.exports = router;