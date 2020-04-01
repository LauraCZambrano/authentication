const express = require('express');
const app = express();

//Controllers
const AuthController = require('../Controllers/AuthController');

//routes
app.post('/auth/signup', AuthController.signup); //SIGN UP
app.post('/auth/signin', AuthController.signin); //SIGN IN
app.get('/auth/session', AuthController.session); //VERIFY SESSION
app.get('/auth/logout', AuthController.logout); //LOGOUT

//exports
module.exports = app;