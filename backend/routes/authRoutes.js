const express = require('express');
const { handleLogin, handleLogout } = require('../controllers/authController');

const router = express.Router();

router.post('/login', handleLogin);
router.get('/logout', handleLogout);

module.exports = router;
