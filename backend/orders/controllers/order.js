const Cart = require("../models/cart");
const Order = require("../models/order");

exports.getOrders = async (req, res, next) => {
    const { userId } = req.params;
    try {
        const orders = await Order.find({ userId }, { id: 0 });
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
    const { userId, finalTotal, address, cartItems } = req.body;
    try {
        const transformedCartItems = cartItems.map(item => ({
            quantity: item.quantity,
            pizzaId: item.pizzaId,
            pizzaData: {
                name: item.name,
                type: item.type,
                price: item.price,
                image: item.image,
                description: item.description,
                ingredients: item.ingredients,
                extraIngredients: item.extraIngredients.map(extra => ({
                    _id: extra._id,
                    tname: extra.tname,
                    price: extra.price,
                    image: extra.image
                })),
                topping: item.topping
            }
        }));
        const orderData = {
            userId,
            finalTotal,
            address,
            cartItems: transformedCartItems
        };
        const savedOrder = await Order.create(orderData);
        await Cart.deleteOne({ userId });
        const responseCartItems = savedOrder.cartItems.map(item => ({
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
        const responseOrder = {
            _id: savedOrder._id.toString(),
            userId: savedOrder.userId.toString(),
            finalTotal: savedOrder.finalTotal,
            address: savedOrder.address,
            cartItems: responseCartItems,
            createdAt: savedOrder.createdAt,
            updatedAt: savedOrder.updatedAt
        };
        res.status(200).json({ message: 'Order added successfully', order: responseOrder });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};