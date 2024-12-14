const express = require('express');
const { getPizzas } = require('../controllers/pizza');

const router = express.Router();

// GET: /pizza/all-pizzas
router.get('/all-pizzas', getPizzas);

module.exports = router;