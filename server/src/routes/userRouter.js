const express = require('express')
const router = express.Router();
const Users = require('../models/Users')

router.post('/register', async(req, res) => {
    try{
      const data = await Users.create(req.body)
    if(data){
        res.json({msg: "user registerd"})
        console.log(data)
    }else{
        res.json({msg: "something went wrong"})
    }
    }catch(err){
        console.log(err)
    }
 })
 
 module.exports = router;