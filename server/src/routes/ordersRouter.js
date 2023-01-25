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
    if(req.headers.authorization){
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
        if(err) return res.sendStatus(403)
        if(decoded)  next()
      });
    }else return res.sendStatus(403)
  }

  router.get("/orders", async (req, res) => {
    try {
        const totalOrdersLength = await Orders.find()
        if(req.query.senderId){
          const data = await Orders.find({"senderId":req.query.senderId})
          res.status(200).json({
            orders: data
        })
        }else{
         const data = await Orders.find().limit(req.query.size).skip(req.query.size* req.query.page - req.query.size)
          if(data){
              res.status(200).json({
                  orders:data,
                  totalOrdersCount: totalOrdersLength.length
              })
          }
        }
       
    } catch (err) {
      console.log(err);
    }
  });

  router.delete("/orders", async (req, res) => {
    try {
      const data = await Orders.findByIdAndDelete(req.body._id)
      if(data){
        res.status(200).json({msg: 'deleted successfully'})
      }
      else{
        res.status(500).json({msg:"something went wrong"})
      }
    } catch (err) {
        console.log(err);
    }
    });

module.exports = router;
