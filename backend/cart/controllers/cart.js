const Cart = require("../models/cart");

exports.getCart = async (_, res, next) => {
    try {
        const cart = await Cart.find();
        res.status(200).json({ message: 'Cart data fetched successfully', cart });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
}