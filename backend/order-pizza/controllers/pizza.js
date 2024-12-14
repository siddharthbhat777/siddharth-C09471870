const Cart = require("../models/cart");
const Pizza = require("../models/pizza");

exports.getPizzas = async (_, res, next) => {
    try {
        const pizzas = await Pizza.find();
        res.status(200).json({ message: 'Pizzas fetched successfully', pizzas });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.addToCart = async (req, res, next) => {
    const userId = req.params.userId;
    const pizzaId = req.params.pizzaId;
    try {
        const cartExistence = await Cart.findOne({ userId });
        const pizza = await Pizza.findById(pizzaId);
        if (!pizza) {
            const error = new Error('Pizza not found');
            error.statusCode = 404;
            throw error;
        }
        if (cartExistence) {
            cartExistence.cartItems.push({
                quantity: 1,
                pizzaData: pizza
            });
            res.status(200).json({ message: 'Added item to cart', cart: cartExistence });
        } else {
            const cart = await Cart.create({
                userId,
                cartItems: [
                    {
                        quantity: 1,
                        pizzaData: pizza
                    }
                ]
            });
            res.status(201).json({ message: 'Added item to cart', cart });
        }
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};