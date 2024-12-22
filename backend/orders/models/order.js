const mongoose = require('mongoose');
const addressSchema = require('./schemas/address');
const cartItemSchema = require('./schemas/cartItem');

const orderSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Types.ObjectId,
        required: true
    },
    finalTotal: {
        type: Number,
        required: true
    },
    address: {
        type: addressSchema,
        required: true
    },
    cart: {
        type: [cartItemSchema],
        required: true
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Order', orderSchema);