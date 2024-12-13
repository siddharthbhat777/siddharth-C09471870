const User = require('../models/user');
const bcrypt = require('bcryptjs');

exports.registerUser = async (req, res, next) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 12);
        const user = await User.create({ ...req.body, password: hashedPassword });
        res.status(201).json({ message: "User res=gistered successfully", user }); 
    } catch (error) {
        if (!error.statusCode) {
            error.statusCode = 500;
        }
        next(error);
    }
};