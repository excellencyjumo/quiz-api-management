const express = require('express');
const router = express.Router();
const { validateSignUpMiddleware, validateLoginMiddleware } = require('../middlewares/validator');
const Auth = require('../controllers/auth');

// Sign up a user
router.post('users/auth/signup', validateSignUpMiddleware, Auth.signUp);
// Log in a user
router.post('users/auth/login', validateLoginMiddleware, Auth.login);

module.exports = router;
