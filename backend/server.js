require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./utils/db');
const authRoutes = require('./routes/authRoutes');

// app creation
const app = express();

// middleware
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);

// db connection and app running
connectDb().then(() => {
    //listen to port
    app.listen(process.env.PORT, () => {
        console.log('Listening for request on port', process.env.PORT);
    });
}).catch((error) => {
    console.log(error);
});
