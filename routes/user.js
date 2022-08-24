const express = require('express');
const router = express.Router();
const { login, register, logout } = require('../controllers/user');
const verifyAuth = require('../middleware/verifyAuth');


router.post('/login', login);  // LOGIN

router.post('/register', register); // REGISTER

router.post('/logout', verifyAuth, logout); // LOGOUT

module.exports = router;
