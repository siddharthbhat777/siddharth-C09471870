const mongoose = require('mongoose');

const pizzaSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['veg', 'nonveg']
  },
  price: {
    type: Number,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  image: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ingredients: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Ingredient',
      required: true
    }
  ],
  topping: [
    {
      type: String,
      required: true
    }
  ]
}, { _id: false });

module.exports = pizzaSchema;