const { Router } = require('express');
const app = Router();
const itemsController = require("../controllers/itemsController")
const upload = require("../middleware/uploadMiddleware")
app.post('/items',itemsController.PostItems)
app.put('/items',itemsController.PutItems)
app.get('/items',itemsController.GetItems)
app.delete('/items',itemsController.DeleteItems)

module.exports = app;
