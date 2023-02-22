const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const Orders=require('./models/Orders')
const io = new Server(server,{
  cors: {
      origin: "*"
  },
});
const cors = require('cors')
const connect = require('./db/connect')
const usersRouter = require('./routes/usersRouter')
const ordersRouter = require('./routes/ordersRouter')
const itemsRouter = require('./routes/itemsRouter')
require('dotenv').config()

io.on('connection', (socket) => {
  console.log("socket is connected")
  socket.on('orderRequest', async(orderRequest)=>{
    io.emit('orderRequest', orderRequest)
    await  Orders.findByIdAndUpdate(orderRequest.id, {"orderStatus": orderRequest.status, "orderStatusId": orderRequest.statusId})
  })
});
app.use(express.json())
app.use(cors())
app.use(usersRouter);
app.use(itemsRouter);
app.use(ordersRouter);

connect()


server.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
