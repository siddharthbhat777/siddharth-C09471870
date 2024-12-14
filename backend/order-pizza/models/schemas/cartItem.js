const mongoose = require('mongoose');
const pizzaSchema = require('./pizza');

const cartItemSchema = new mongoose.Schema({
  quantity: {
    type: Number,
    required: true
  },
  pizzaId: {
    type: mongoose.Types.ObjectId,
    required: true
  },
  pizzaData: {
    type: pizzaSchema,
    required: true
  }
}, { _id: false });

module.exports = cartItemSchema;