const express = require('express');
const router = express.Router();
const { registerCustomer, registerWorker, login } = require('../controller/auth.controller');

// Customer Registration
router.post('/register/customer', registerCustomer);
// Worker Registration
router.post('/register/worker', registerWorker);
// User Login (customer or worker)
router.post('/login', login);

module.exports = router;