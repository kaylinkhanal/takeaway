const express = require('express')
const app = express()
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
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
  console.log('a user connected',socket.id);
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
