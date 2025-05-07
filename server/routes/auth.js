// routes/auth.js
const express = require('express');
const router = express.Router();  // Use Router() to instantiate a new router
const { registerUser, loginUser } = require('../controllers/authController');

// Define routes
router.post('/register', registerUser);
router.post('/login', loginUser);

module.exports = router;  // Export the router
