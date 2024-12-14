const Cart = require("../models/cart");
require("../models/ingredient");

exports.getCart = async (_, res, next) => {
    try {
        const cart = await Cart.find().populate({
            path: 'cartItems.pizzaData.ingredients',
            model: 'Ingredient'
        });
        res.status(200).json({ message: 'Cart data fetched successfully', cart });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};