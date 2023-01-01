var express     = require('express');
var router      = express.Router();
const Product = require("../models/Products");

router.post("/products", async(req, res) => {
    await Product.create(req.body);
    console.log(req.body);
  });

module.exports = router;
  