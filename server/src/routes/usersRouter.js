const express = require("express");
const { db } = require("../models/Users");
const router = express.Router();
const Users = require("../models/Users");
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
  try {
    const user = await Users.findOne({email: req.body.email})
    if(user){
      const {password} = user
      const isMatched = bcrypt.compareSync(req.body.password, password)
      console.log(isMatched)
    }else{
      res.json({
        msg: "user doesn't exist"
      })
    }
  } catch (err) {
    console.log(err);
  }
});
module.exports = router;
