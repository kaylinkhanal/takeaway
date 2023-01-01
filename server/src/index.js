const express = require('express')
<<<<<<< HEAD
const app = express()
const port = 3007
// const productRoutes=require('./routes/productRoutes')
const userRouter=require('./userRoutes/userRouters')
const connect=require('./userDb/userConnect')
const cors = require('cors')
require('dotenv').config()
app.use(express.json())
app.use(cors())
// app.use(productRoutes)
app.use(userRouter)
// const connectMongoose=require('./db/connect')
connect()



app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
=======
const cors = require('cors')
const connect = require('./db/connect')
const productsRouter = require('./routes/productsRouter')
require('dotenv').config()

const app = express()

app.use(express.json())
app.use(cors())
app.use(usersRouter);

connect()

console.log(process.env)
app.listen(process.env.PORT, () => {
  console.log(`Example app listening on port ${process.env.PORT}`)
})
>>>>>>> 1116cf309c576cad60e1484e9cb419e6fab9f747
