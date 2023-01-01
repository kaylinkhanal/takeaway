//import the products
const express = require('express');
const Login = require('../models/Login');
const router = express.Router();


router.post('/login', async(req, res) => {
    try{
      const data = await Login.create(req.body)
    if(data){
        res.json({msg: "Login is added"})
    }else{
        res.json({msg: "something went wrong"})
    }
    }catch(err){
        console.log(err)
    }
 })
 
 module.exports = router;
