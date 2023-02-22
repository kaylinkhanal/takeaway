const { Router } = require('express');
const app = Router();
const itemsController = require("../controllers/itemsController")
const uploadMiddleware = require("../middleware/uploadMiddleware")
app.post('/items', uploadMiddleware.upload, itemsController.PostItems)
app.put('/items', itemsController.PutItems)
app.get('/items', itemsController.GetItems)
app.delete('/items', itemsController.DeleteItems)
module.exports = app;
