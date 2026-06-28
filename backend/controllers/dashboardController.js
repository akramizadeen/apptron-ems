const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const Department = require('../models/Department');

const getDashboardData = async (req, res) => {
    try {
        const employees = await Employee.find({});
        const activeEmployees = await Employee.find({ status: 'Active' });
        const inactiveEmployees = await Employee.find({ status: 'Inactive' });
        const departments = await Department.find({});
        const recentEmployees = await Employee.find({}).sort({ createdAt: -1 }).limit(8);

        const dashboardData = {
            recentEmployees,
            numberOfEmployees: employees.lengh,
            numberOfActiveEmployees: activeEmployees.length,
            numberOfInactiveEmployees: inactiveEmployees.lengh,
            numberOfDepartments: departments.lengh,
        }

        res.status(200).json(dashboardData);
    } catch (error) {
        console.error('Error fetching dashboard data!', error);
        res.status(500).json({ message: 'Server error!' });
    }
}

module.exports = { getDashboardData }
