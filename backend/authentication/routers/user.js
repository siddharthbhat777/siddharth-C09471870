const express = require('express');
const { registerUser } = require('../controllers/user');

const router = express.Router();

// POST: /user/register
router.post('/register', registerUser);

module.exports = router;