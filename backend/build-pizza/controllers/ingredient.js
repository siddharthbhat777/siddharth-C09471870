const Ingredient = require("../models/ingredient");

exports.getIngredients = async (_, res, next) => {
    try {
        const ingredients = await Ingredient.find();
        res.status(200).json({ message: 'Ingredients fetched successfully', ingredients });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}