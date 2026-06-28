const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const Employee = require('../models/Employee');

// create a employee
const createEmployee = async (req, res) => {
    try {
        const { fullName, email, password, phoneNumber, department, position, salary, dateOfJoining, address, profileImg } = req.body;

        const existingEmployee = await Employee.findOne({ email: email });

        if (existingEmployee) {
            return res.status(400).json({ message: 'Employee already exists!' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const newEmployee = new Employee({
            fullName,
            email,
            password: hashedPassword,
            phoneNumber,
            department,
            position,
            salary,
            dateOfJoining,
            address,
            profileImg
        });
        const savedEmployee = await newEmployee.save();
        res.status(201).json({ message: 'Employee added!', savedEmployee });
    } catch (error) {
        console.error('Error adding employee', error);
        res.status(500).json({ message: 'Server error!' });
    }
}

// get all employees
const getAllEmployees = async (req, res) => {
    try {
        const employees = await Employee.find({}).sort({ createdAt: -1 });

        if (employees.length === 0) {
            return res.status(400).json({ message: 'No employees found!' });
        }

        res.status(200).json(employees);
    } catch (error) {
        console.error('Error loading employees', error);
        res.status(500).json({ message: 'Server error!' });
    }
}

// get one employee by id
const getEmployeeById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Not a valid id!' });
        }

        const employee = await Employee.findById(id);

        if (!employee) {
            return res.status(404).json({ message: 'Employee not found!' });
        }

        res.status(200).json(employee);
    } catch (error) {
        console.error('Error finding employee', error);
        res.status(500).json({ message: 'Server error!' });
    }
}

// update a employee
const updateEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Not a valid id!' });
        }

        const updatedEmployee = await Employee.findByIdAndUpdate(id, { ...req.body }, { returnDocument: 'after' });

        if (!updatedEmployee) {
            return res.status(404).json({ message: 'Employee not found!' });
        }

        res.status(200).json({ message: 'Employee epdated!', updatedEmployee });
    } catch (error) {
        console.error('Error updating employee', error);
        res.status(500).json({ message: 'Server error!' });
    }
}
// delete a employee
const deleteEmployee = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.isValidObjectId(id)) {
            return res.status(400).json({ message: 'Not a valid id!' });
        }
        
        const deletedEmployee = await Employee.findByIdAndDelete(id);

        if (!deleteEmployee) {
            return res.status(404).json({ message: 'Employee not found!' });
        }

        res.status(200).json({ message: 'Employee deleted!' });
    } catch (error) {
        console.error('Error deleting employee', error);
        res.status(500).json({ message: 'Server error!' });
    }
}

module.exports = {
    createEmployee,
    getAllEmployees,
    getEmployeeById,
    updateEmployee,
    deleteEmployee
}
