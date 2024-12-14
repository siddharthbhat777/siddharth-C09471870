const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

exports.registerUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json({ message: "User resgistered successfully", user });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.loginUser = async (req, res, next) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ "contactDetails.email": email });
        if (!user) {
            const error = new Error('User not found');
            error.statusCode = 404;
            throw error;
        }
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            const error = new Error('Incorrect password');
            error.statusCode = 401;
            throw error;
        }
        const accessToken = jwt.sign(
            { email: user.contactDetails.email, userId: user._id },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );
        const refreshToken = jwt.sign(
            { userId: user._id },
            'refreshsupersecretsecret',
            { expiresIn: '7d' }
        );
        user.refreshToken = refreshToken;
        await user.save();
        res.status(200).json({ accessToken, refreshToken });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.refreshToken = async (req, res, next) => {
    const { refreshToken } = req.body;
    try {
        const decoded = jwt.verify(refreshToken, 'refreshsupersecretsecret');
        const user = await User.findById(decoded.userId);
        if (!user || user.refreshToken !== refreshToken) {
            const error = new Error('Invalid refresh token');
            error.statusCode = 403;
            throw error;
        }
        const newAccessToken = jwt.sign(
            { email: user.contactDetails.email, userId: user._id },
            'somesupersecretsecret',
            { expiresIn: '1h' }
        );
        res.status(200).json({ accessToken: newAccessToken });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};