const { Router } = require('express');
const app = Router();
const usersController = require("../controllers/usersController")
const uploadMiddleware = require("../middleware/uploadMiddleware")

app.post('/profile',uploadMiddleware.upload,usersController.PostProfile)
app.put('/changePassword',usersController.PutChangePassword)
app.get('/users/:id',usersController.GetUsers)
app.get('/users',usersController.GetAllUsers)
app.post('/messages',usersController.PostMessages)
app.get('/messages/:id', usersController.GetMessagesById)


module.exports = app;
