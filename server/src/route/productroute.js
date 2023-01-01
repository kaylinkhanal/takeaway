const express = require('express')
const router = express.Router();
const Products = require('../model/product')


router.post('/product', async(req, res) => {
    try{
      const data = await Products.create(req.body)
    if(data){
        res.json({msg: "product is added"})
    }else{
        res.json({msg: "something went wrong"})
    }
    }catch(err){
        console.log(err)
    }
 })
 
 module.exports = router;