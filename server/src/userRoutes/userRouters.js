//import the products
const express = require('express')
const router = express.Router();
// const Products=require('../models/products')
const UserRegister=require('../userModels/userRegister')


// router.post('/products', async(req, res) => {
//     try{
//       const data = await Products.create(req.body)
//     if(data){
//         res.json({msg: "product is added"})
//     }else{
//         res.json({msg: "something went wrong"})
//     }
//     }catch(err){
//         console.log(err)
//     }
//  })

router.post('/userRegister', async(req, res) => {
    try{
      const data = await UserRegister.create(req.body)
    if(data){
        res.json({msg: "register is done"})
    }else{
        res.json({msg: "something went wrong"})
    }
    }catch(err){
        console.log(err)
    }
 })
 
 module.exports = router;
