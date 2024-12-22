const express = require('express');
const { getOrders, addOrder } = require('../controllers/order');

const router = express.Router();

// GET: /order/all-orders
router.get('/all-orders', getOrders);

// POST: /order/add
router.post('/add', addOrder);

module.exports = router;