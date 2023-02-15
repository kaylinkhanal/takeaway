const { Router } = require('express');
const app = Router();
const ordersController = require("../controllers/ordersController")

app.post('/orders',ordersController.PostOrder)
app.patch('/orders/status',ordersController.PatchOrder)
app.get('/orders',ordersController.GetOrder)
app.delete('/orders',ordersController.DeleteOrder)
app.put('/orders',ordersController.PutOrder)

module.exports = app;
