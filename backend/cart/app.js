const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const cartRoutes = require('./routes/cart');

const app = express();
app.use(express.json());

// Constants
const DATABASE_URL = "mongodb://localhost:27017/pizzeria";
const SERVER_PORT = 5005;

// Setting headers
app.use(cors({ methods: ['GET', 'PUT'] }));

// Request logs
app.use((req, _, next) => {
    console.log(`[${new Date().toISOString()}] Incoming request: ${req.method} ${req.url}`);
    next();
});

// Setting up routes
app.use('/cart', cartRoutes);

// Error logging format
app.use((error, _, res, ignoreLint) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// Connecting database
mongoose.connect(DATABASE_URL).then(() => {
    app.listen(SERVER_PORT, () => {
        console.log("Shopping cart server is running on port: " + SERVER_PORT);
    });
}).catch((error) => {
    console.log("Failed to connect to mongoDB.\nError reference:\n", error);
});