const Employee = require('../models/Employee');
const mongoose = require('mongoose');

// get all employees
const getAllEmployees = async (req, res) => {
    const employees = await Employee.find({}).sort({ createdAt: -1 });
    res.status(200).json(employees);
}
