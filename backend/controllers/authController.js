require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Employee = require('../models/Employee');


// login
const handleLogin = async (req, res) => {
    const { email, password } = req.body;

    const user = await Employee.find({ email: email });

    if (!user) {
        res.status(404).json({ message: 'User not found' });
    }

    const isPasswordMatch = await bcrypt.compare(
        password,
        user.password
    );

    if (email !== user.email || !isPasswordMatch) {
        res.status(400).json({ message: 'Invalid credentials!' });
    }
    
    const token = jwt.sign(
        {
            id: user._id,
            email: user.email,
        },
        process.env.JWT_SECRET,
        { expresIn: '1h' }
    );

    res.json({ token });
}

// logout

module.exports = { handleLogin }
