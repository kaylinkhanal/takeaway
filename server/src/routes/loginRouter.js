const { Router } = require('express');
const app = Router();
const loginController = require("../controllers/loginController")

app.post('/login',loginController.Login)

module.exports = app;