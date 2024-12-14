const express = require('express');
const { getIngredients, customizePizza } = require('../controllers/build');

const router = express.Router();

// GET: /build/ingredients
router.get('/ingredients', getIngredients);

// PUT: /build/customize/:userId/:pizzaId
router.put('/customize/:userId/:pizzaId', customizePizza);

module.exports = router;