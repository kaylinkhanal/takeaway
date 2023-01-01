const express = require('express')
const cors = require('cors')
const connect = require('./db/connect')
const productsRouter = require('./routes/productsRouter')
<<<<<<< HEAD
const userRoute=require("./routes/userRoute")
=======
>>>>>>> 1116cf309c576cad60e1484e9cb419e6fab9f747
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
<<<<<<< HEAD
app.use(productsRouter)
app.use(userRoute)

connect()

app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
=======
app.use(usersRouter);

connect()

console.log(process.env)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
>>>>>>> 1116cf309c576cad60e1484e9cb419e6fab9f747
