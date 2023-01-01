//import the products
const express = require('express')
const router = express.Router();
const user = require('../models/user')

router.post('/register', async(req, res) => {
    try{
      const data = await user.create(req.body)
    if(data){
        res.json({msg: "user is registered"})
    }else{
        res.json({msg: "something went wrong"})
    }
    }catch(err){
        console.log(err)
    }
 })
 
 module.exports = router;