const express = require('express');
const app = express();

//specifics routes
app.use(require('./auth')); //Authentication routes: sign up, sign in, logout



//exports
module.exports = app;