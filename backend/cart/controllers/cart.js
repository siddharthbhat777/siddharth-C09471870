const Cart = require("../models/cart");
require("../models/ingredient");

exports.getCart = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const cart = await Cart.findOne({ userId }, { _id: 0, cartItems: 1 }).populate({
            path: 'cartItems.pizzaData.extraIngredients',
            select: '-id',
            model: 'Ingredient'
        });
        res.status(200).json({ message: 'Cart data fetched successfully', cartItems: cart ? cart.cartItems : [] });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.updateCart = async (req, res, next) => {
    const { userId, pizzaId } = req.params;
    const { operation } = req.body;
    try {
        if (!['plus', 'minus'].includes(operation)) {
            const error = new Error('Invalid operation specified');
            error.statusCode = 422;
            throw error;
        }
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const error = new Error('Cart not found');
            error.statusCode = 404;
            throw error;
        }
        const pizzaToUpdate = cart.cartItems.find((item) => item.pizzaId.toString() === pizzaId);
        if (!pizzaToUpdate) {
            const error = new Error('Pizza not found in the cart');
            error.statusCode = 404;
            throw error;
        }
        if (operation === 'plus') {
            pizzaToUpdate.quantity++;
        } else {
            if (pizzaToUpdate.quantity < 2) {
                const error = new Error('Cannot decrease quantity below 1; please use delete API');
                error.statusCode = 422;
                throw error;
            }
            pizzaToUpdate.quantity--;
        }
        await cart.save();
        res.status(200).json({ message: 'Updated cart successfully', cart })
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteCartItem = async (req, res, next) => {
    const { userId, pizzaId } = req.params;
    try {
        const cart = await Cart.findOne({ userId });
        if (!cart) {
            const error = new Error('Cart not found');
            error.statusCode = 404;
            throw error;
        }
        if (cart.cartItems.length < 2) {
            await Cart.findByIdAndDelete(cart._id);
            return res.status(200).json({ message: 'Cart deleted successfully' });
        }
        const pizza = cart.cartItems.find((item) => item.pizzaId.toString() === pizzaId);
        if (!pizza) {
            const error = new Error('Pizza not found in the cart');
            error.statusCode = 404;
            throw error;
        }
        cart.cartItems = cart.cartItems.filter(item => item.pizzaId.toString() !== pizzaId);
        await cart.save();
        res.status(200).json({ message: 'Pizza removed from the cart successfully', cart });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};