const express = require('express');
const { registerUser, loginUser, refreshToken } = require('../controllers/user');

const router = express.Router();

// POST: /user/register
router.post('/register', registerUser);

// PUT: /user/login
router.put('/login', loginUser);

// PUT: /user/refresh-token
router.put('/refresh-token', refreshToken);

module.exports = router;