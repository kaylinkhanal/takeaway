//import the products
const express = require('express')
const router = express.Router();
const Products = require('../models/Products')

<<<<<<< HEAD
router.post('/products', async(req, res) => {
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
=======
router.post('/products', async (req, res) => {
    try {
        const data = await Products.create(req.body)
        if (data) {
            res.json({ msg: "product is added" })
        } else {
            res.json({ msg: "something went wrong" })
        }
    } catch (err) {
        console.log(err)
    }
})

module.exports = router;
>>>>>>> 1116cf309c576cad60e1484e9cb419e6fab9f747
