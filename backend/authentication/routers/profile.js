const express = require('express');
const { profileEdit, addAddress, deleteAddress } = require('../controllers/profile');

const router = express.Router();

// PUT: /profile/edit/:userId
router.put('/edit/:userId', profileEdit);

// POST: /profile/add-address/:userId
router.put('/add-address/:userId', addAddress);

// PUT: /profile/delete-address/:userId/:addressId
router.put('/delete-address/:userId/:addressId', deleteAddress);

module.exports = router;