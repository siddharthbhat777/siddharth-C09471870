const User = require("../models/user");

exports.profileEdit = async (req, res, next) => {
    const userId = req.params.userId;
    const allowedFields = ["firstname", "lastname", "age", "phone"];
    const updateData = {};
    for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
            updateData[key] = req.body[key];
        }
    }
    try {
        const user = await User.findByIdAndUpdate(userId, updateData, { new: true, runValidators: true });
        res.status(200).json({ message: 'Updated user profile successfully', user });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.addAddress = async (req, res, next) => {
    const userId = req.params.userId;
    const allowedFields = ["title", "receiverName", "receiverPhone", "addressLine", "pincode", "city", "state"];
    const newAddress = {};
    for (const key of allowedFields) {
        if (req.body[key] !== undefined) {
            newAddress[key] = req.body[key];
        }
    }
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
                $push: { "contactDetails.addresses": newAddress }
            },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        res.status(201).json({ message: 'Added address successfully', user: updatedUser });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};

exports.deleteAddress = async (req, res, next) => {
    const userId = req.params.userId;
    const addressId = req.params.addressId;
    try {
        const updatedUser = await User.findByIdAndUpdate(userId, {
                $pull: { "contactDetails.addresses": { _id: addressId } }
            },
            { new: true }
        );
        if (!updatedUser) {
            const error = new Error('User not found.');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({ message: 'Deleted address successfully', user: updatedUser });
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};