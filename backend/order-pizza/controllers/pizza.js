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
}