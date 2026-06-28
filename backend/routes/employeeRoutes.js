const express = require('express');
const { authMiddleware } = require('../middleware/authMiddleware');
const { getAllEmployees, createEmployee, updateEmployee, deleteEmployee, getEmployeeById } = require('../controllers/employeeController');

const router = express.Router();

router.post('/create', authMiddleware, createEmployee);
router.get('/', authMiddleware, getAllEmployees);
router.get('/:id', authMiddleware, getEmployeeById);
router.patch('/update/:id', authMiddleware, updateEmployee);
router.delete('/delete/:id', authMiddleware, deleteEmployee);

module.exports = router;
