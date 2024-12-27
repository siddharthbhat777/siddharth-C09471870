const mongoose = require('mongoose');
const cartItemSchema = require('./schemas/cartItem');

const cartSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  cartItems: {
    type: [cartItemSchema],
    required: true
  }
}, {
    timestamps: true
});

module.exports = mongoose.model('Cart', cartSchema);