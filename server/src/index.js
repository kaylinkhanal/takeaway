const express = require('express')
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