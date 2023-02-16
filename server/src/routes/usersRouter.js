const { Router } = require('express');
const app = Router();
const usersController = require("../controllers/usersController")
const uploadMiddleware = require("../middleware/uploadMiddleware")

app.post('/profile',uploadMiddleware.upload,usersController.PostProfile)
app.put('/changePassword',usersController.PutChangePassword)
app.get('/users/:id',usersController.GetUsers)

module.exports = app;
