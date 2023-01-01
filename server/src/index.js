
const express = require("express");
const app = express();
const port =3005;
const productRouter = require("./routes/productRouter");
var cors = require("cors");
require('dotenv').config()

app.use(express.json());
app.use(cors());
app.use(productRouter);

const connect = require('./db/connect')
connect();


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
