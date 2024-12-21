const mongoose = require('mongoose');
const contactSchema = require('./schemas/contact');

const userSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true
    },
    age: {
        type: Number,
        required: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    contactDetails: {
        type: contactSchema,
        required: true
    },
    refreshToken: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('User', userSchema);