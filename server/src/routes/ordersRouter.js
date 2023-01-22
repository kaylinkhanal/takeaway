const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const jwt = require('jsonwebtoken');
router.post("/orders",  async (req, res) => {
    try {
        const dbResponse = await Orders.create(req.body)
        if(dbResponse){
            res.status(200).json({
                msg: "orders dispatched successfully"
            })
        }
    } catch (err) {
      console.log(err);
    }
  });

  const tokenValidator = (req, res, next)=> {
    const token = req.headers.authorization.split(' ')[1]
    jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
      if(err) return res.sendStatus(403)
      if(decoded)  next()
    });
  }

  router.get("/orders", tokenValidator, async (req, res) => {
    //   const bearerToken =req.headers.authorization.split(' ')[1]
    // console.log(bearerToken)
    try {
        const data = await Orders.find()
        if(data){
            res.status(200).json({
                orders:data
            })
        }
    } catch (err) {
      console.log(err);
    }
  });
module.exports = router;
