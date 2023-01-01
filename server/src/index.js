const express = require('express')
const cors = require('cors')
const connect = require('./db/connect')
const  productsRouter = require('./routes/productsRouter')
const usersRouter = require('./routes/usersRouter')
require('dotenv').config()
const port = 3005

const app = express()

app.use(express.json())
app.use(cors())
app.use(productsRouter);
app.use(usersRouter);

connect()

console.log(process.env)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
