const { Router } = require('express');
const app = Router();
const registerController = require("../controllers/registerController")

app.post('/register',registerController.Register)

module.exports = app;