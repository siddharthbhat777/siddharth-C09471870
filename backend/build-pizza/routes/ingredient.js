const express = require('express');
const { getIngredients } = require('../controllers/ingredient');

const router = express.Router();

// GET: /ingredient/all-ingredients
router.get('/all-ingredients', getIngredients);

module.exports = router;