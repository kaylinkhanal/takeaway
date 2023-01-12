const express = require('express')
const cors = require('cors')
const connect = require('./db/connect')
const usersRouter = require('./routes/usersRouter')
const itemsRouter = require('./routes/itemsRouter')
const measurementRouter = require('./routes/measurementRouter')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(usersRouter);
app.use(itemsRouter);
app.use(measurementRouter);

connect()

console.log(process.env)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
