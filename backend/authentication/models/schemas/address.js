const mongoose = require('mongoose');

const addressSchema = new mongoose.Schema({
    receiverName: {
        type: String,
        required: true,
        trim: true
    },
    receiverPhone: {
        type: String,
        trim: true,
        validate: {
            validator: function (value) {
                return /^\d{10}$/.test(value);
            },
            message: 'Phone number must be 10 digits.'
        }
    },
    addressLine: {
        type: String,
        required: true
    },
    pincode: {
        type: Number,
        required: true,
        validate: {
            validator: function (value) {
                return /^\d{6}$/.test(value.toString());
            },
            message: 'Pincode must be exactly 6 digits.'
        }
    },
    city: {
        type: String,
        required: true,
        trim: true
    },
    state: {
        type: String,
        required: true,
        trim: true
    }
}, { _id: false });

module.exports = addressSchema;