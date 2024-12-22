const Order = require("../models/order");

exports.getOrders = async (_, res, next) => {
    try {
        const orders = await Order.find({}, { id: 0 });
        res.status(200).json({ message: 'Orders fetched successfully', orders });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};