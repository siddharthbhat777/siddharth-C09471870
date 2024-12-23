const Order = require("../models/order");

exports.getOrders = async (_, res, next) => {
    try {
        const orders = await Order.find({}, { id: 0 });
        const transformedOrders = orders.map(order => {
            const transformedCartItems = order.cartItems.map(item => ({
                quantity: item.quantity,
                pizzaId: item.pizzaId.toString(),
                name: item.pizzaData.name,
                type: item.pizzaData.type,
                price: item.pizzaData.price,
                image: item.pizzaData.image,
                description: item.pizzaData.description,
                ingredients: item.pizzaData.ingredients,
                extraIngredients: item.pizzaData.extraIngredients.map(extra => ({
                    _id: extra._id.toString(),
                    tname: extra.tname,
                    price: extra.price,
                    image: extra.image
                })),
                topping: item.pizzaData.topping
            }));
            return {
                ...order.toObject(),
                cartItems: transformedCartItems
            };
        });
        res.status(200).json({ message: 'Orders fetched successfully', orders: transformedOrders });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.addOrder = async (req, res, next) => {
    try {
        const order = await Order.create(req.body);
        res.status(200).json({ message: 'Order added successfully', order });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};