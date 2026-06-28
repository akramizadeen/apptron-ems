require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDb } = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const employeeRoutes = require('./routes/employeeRoutes');

// app creation
const app = express();

// middleware
app.use(express.json());

// cors
app.use(cors({ origin: 'http://localhost:3000' }));

// routes
app.use('/api/auth', authRoutes);
app.use('/api/employee', employeeRoutes);

// db connection and app running
connectDb().then(() => {
    //listen to port
    app.listen(process.env.PORT, () => {
        console.log('Listening for request on port', process.env.PORT);
    });
}).catch((error) => {
    console.log(error);
});
