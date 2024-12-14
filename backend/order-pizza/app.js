const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// Constants
const DATABASE_URL = "mongodb+srv://siddharthC09471870:C09471870@pizzeria.vsmlx.mongodb.net/pizzeria";
const SERVER_PORT = 5001;

// Setting headers
app.use(cors({ methods: ['GET', 'POST'] }));

// Setting up routes
// app.use('/path', );

// Error logging format
app.use((error, _, res) => {
    console.log(error);
    const status = error.statusCode || 500;
    const message = error.message;
    const data = error.data;
    res.status(status).json({ message: message, data: data });
});

// Connecting database
mongoose.connect(DATABASE_URL).then(() => {
    app.listen(SERVER_PORT, () => {
        console.log("Authentication server is running on port: " + SERVER_PORT);
    });
}).catch((error) => {
    console.log("Failed to connect to mongoDB.\nError reference:\n", error);
});