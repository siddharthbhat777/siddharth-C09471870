const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  tname: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: false
  },
  image: {
    type: String,
    required: false
  },
});

module.exports = mongoose.model('Ingredient', ingredientSchema);