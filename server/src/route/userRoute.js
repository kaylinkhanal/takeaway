const express = require('express')
const router = express.Router();
const User = require('../model/user')


router.post('/user', async(req, res) => {
    try{
      const data = await User.create(req.body)
    if(data){
        res.json({msg: "user is added"})
    }else{
        res.json({msg: "something went wrong"})
    }
    }catch(err){
        console.log(err)
    }
 })
 
 module.exports = router;