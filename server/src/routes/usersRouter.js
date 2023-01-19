const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt")
const multer  = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).single('avatar')
router.post('/profile', upload, function (req, res, next) {
})
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
          res.json({ errorMsg: "something went worng" });
        }
      } else {
        res.status(409).json({ errorMsg: "user already exists" });
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
        isLogedin:true,
        userData: refactoredUserObj
      })
    }
    else{
      res.status(401).json({
        errorMsg:"Invalid username and password"
      })
    }
    }
    catch(err){
      console.log(err)
    }
    }
    else{
      res.json({
        errorMsg:"User doesn't exist"
      })
    }

});

module.exports = router;
