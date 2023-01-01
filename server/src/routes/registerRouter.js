//import the products
const express = require('express');
const router = express.Router();
const Register = require('../models/Register');

router.post('/register', async(req, res) => {
    try{
      const data = await Register.create(req.body)
    if(data){
        res.json({msg: "Register is added"})
    }else{
        res.json({msg: "something went wrong"})
    }
    }catch(err){
        console.log(err)
    }
 })
 
 module.exports = router;
