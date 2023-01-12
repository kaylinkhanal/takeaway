const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
  
router.post("/orders", async (req, res) => {
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

  router.get("/orders", async (req, res) => {
    try {
        const data = await Orders.find()
        if(data){
            res.status(200).json({
                data:data
            })
        }
    } catch (err) {
      console.log(err);
    }
  });
module.exports = router;
