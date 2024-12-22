const express = require('express');
const { getOrders } = require('../controllers/order');

const router = express.Router();

// GET: /order/all-orders
router.get('/all-orders', getOrders);

module.exports = router;