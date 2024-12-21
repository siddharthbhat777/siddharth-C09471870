const express = require('express');
const { profileEdit } = require('../controllers/profile');

const router = express.Router();

// PUT: /profile/edit/:userId
router.put('/edit/:userId', profileEdit);

module.exports = router;