const express = require('express')
const app = express()
const port = 3005
const mongoose = require('mongoose')
const cors = require('cors')
const productRoute = require('./route/productroute')
const userRoute = require('./route/userRoute')
const connect = require('./db/db')
//query strings
//params


connect()

app.use(cors)
app.use(express.json())
app.use(productRoute)
app.use(userRoute)


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
