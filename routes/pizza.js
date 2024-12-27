const express = require('express');
const { getPizzas, addToCart } = require('../controllers/pizza');

const router = express.Router();

// GET: /pizza/all-pizzas
router.get('/all-pizzas', getPizzas);

// PUT: /pizza/add-to-cart/:userId/:pizzaId
router.put('/add-to-cart/:userId/:pizzaId', addToCart);

module.exports = router;