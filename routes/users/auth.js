const express = require('express');
const routes = express.Router();
const { register, login, authGoogle, forgotPassword, resetPass } = require('../../controllers/users/auth/authController');

// welcome
routes.post('/register', register); //register basic
routes.post('/login', login); // login basic
routes.get('/google', authGoogle); // register and login google
routes.post('/forgot-password', forgotPassword); // forgot password
routes.post('/reset-password', resetPass); //reset password

module.exports = routes;
