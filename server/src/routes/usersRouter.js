const express = require("express");
const { db } = require("../models/Users");
const router = express.Router();
const Users = require("../models/Users");
// const { db } = require("../models/Items");
const Items = require("../models/Items");
const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        req.body.password = hash
        const userData =  Users.create(req.body);
        if (userData) {
          res.json({ msg: "user is added" });
        } else {
          res.json({ msg: "something went worng" });
        }
      } else {
        res.status(409).json({ error: "user already exists" });
      }
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  const user = await Users.findOne({email: req.body.email}).lean()
  if(user){
    try{
    const {email,password} = user;
    const isMatched= bcrypt.compareSync(req.body.password, password)
    if(email && isMatched){
      const {password, ...refactoredUserObj} = user
      res.status(200).json({
        msg:"logged in successfully",
        userData: refactoredUserObj
      })
    }
    else{
      res.status(401).json({
        error:"unauthorized user"
      })
    }
    }
    catch(err){
      console.log(err)
    }
    }
    else{
      res.json({
        msg:"user doesn't exist"
      })
    }

});


router.post("/additem", async (req, res) => {
  try {
    Items.findOne({ catagoryName: req.body.catagoryName }).then((item) => {
      console.log(item);
      
      if(!item){
        const itemData =  Items.create(req.body);
         console.log(itemData);
        if (itemData) {
          res.json({ msg: "Item is added" });
        } else {
          res.json({ msg: "something went worng" });
        } 
      }
      else{
        res.status(409).json({ error: "item already exists" });
      }
 
    });
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
