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