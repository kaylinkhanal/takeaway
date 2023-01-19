const express = require('express')
const cors = require('cors')
const connect = require('./db/connect')
const usersRouter = require('./routes/usersRouter')
const ordersRouter = require('./routes/ordersRouter')
const itemsRouter = require('./routes/itemsRouter')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(usersRouter);
app.use(itemsRouter);
app.use(ordersRouter);

connect()


app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
