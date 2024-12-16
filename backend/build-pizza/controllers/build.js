const Ingredient = require("../models/ingredient");
const Cart = require("../models/cart");
const Pizza = require("../models/pizza");

exports.getIngredients = async (_, res, next) => {
    try {
        const ingredients = await Ingredient.find({}, { id: 0 });
        res.status(200).json({ message: 'Ingredients fetched successfully', ingredients });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}

exports.customizePizza = async (req, res, next) => {
    const { userId, pizzaId } = req.params;
    const { ingredients } = req.body;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const error = new Error('Cart not found');
            error.statusCode = 404;
            throw error;
        }
        const pizza = cart.cartItems.find((item) => item.pizzaId.toString() === pizzaId);
        if (!pizza) {
            const error = new Error('Pizza not found in cart');
            error.statusCode = 404;
            throw error;
        }
        const defaultPizza = await Pizza.findById(pizzaId, { id: 0 });
        if (!defaultPizza) {
            const error = new Error('Default pizza not found');
            error.statusCode = 404;
            throw error;
        }
        pizza.pizzaData = { ...defaultPizza, extraIngredients: ingredients };
        // pizza.pizzaData.ingredients = [...defaultPizza.ingredients, ...ingredients];
        await cart.save();
        res.status(200).json({ message: 'Built pizza successfully', cart: cart });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};