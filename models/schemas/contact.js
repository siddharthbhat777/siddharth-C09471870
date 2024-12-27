const mongoose = require('mongoose');
const addressSchema = require('./address');

const contactSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate: {
            validator: function (value) {
                return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
            },
            message: 'Invalid email address.'
        }
    },
    phone: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\d{10}$/.test(value);
            },
            message: 'Phone number must be 10 digits.'
        },
        required: false
    },
    addresses: {
        type: [addressSchema],
        required: false
    }
}, { _id: false });

module.exports = contactSchema;