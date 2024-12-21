const express = require('express');
const { profileEdit, addAddress } = require('../controllers/profile');

const router = express.Router();

// PUT: /profile/edit/:userId
router.put('/edit/:userId', profileEdit);

// POST: /profile/add-address/:userId
router.put('/add-address/:userId', addAddress);

module.exports = router;