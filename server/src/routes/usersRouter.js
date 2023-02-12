const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt")
const multer = require('multer')
var jwt = require('jsonwebtoken');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
  }
})

const upload = multer({ storage: storage }).single('avatar')

router.post('/profile', upload, async (req, res) => {
  console.log(req.file)
  const data = await Users.findByIdAndUpdate(req.body._id, { avatarName: req.file.filename }).lean()
  if (data) {
    res.status(200).json({
      msg: "imageUploaded Successfully",
    })
  }
})
router.put("/changePassword", async (req, res) => {
  try {
    const user = await Users.findOne({ _id: req.query._id })
    if (user) {
      const { password } = user;
      const isMatched = bcrypt.compareSync(req.body.currentPassword, password);
      if (isMatched) {
        const hash = await bcrypt.hashSync(req.body.newPassword, 10);
        user.password = hash;
        const data = await Users.findByIdAndUpdate(user._id, user);
        if (data) {
          res.status(200).json({ msg: "Password has changed" })
        }
        else {
          res.status(500).json({ msg: "something went wrong" })
        }
      } else {
        res.status(500).json({ msg: "Current password does not matched" })
      }
    }

  } catch (err) {
    console.log(err);
  }
});
router.post("/register", async (req, res) => {
  try {
    const hash = await bcrypt.hashSync(req.body.password, 10);
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        req.body.password = hash
        const userData = Users.create(req.body);
        if (userData) {
          res.json({
            isRegistered: true,
            msg: "Your account is successfully Added"
          });
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
  const user = await Users.findOne({ email: req.body.email }).lean()
  if (user) {
    try {
      const { email, password } = user;
      const isMatched = await bcrypt.compareSync(req.body.password, password)
      if (email && isMatched) {
        const token = await jwt.sign({ email: req.body.email }, process.env.SECRET_TOKEN);
        user.token = token
        const { password, ...refactoredUserObj } = user
        res.status(200).json({
          msg: "logged in successfully",
          isLogedin: true,
          userData: refactoredUserObj
        })
      }
      else {
        res.status(401).json({
          errorMsg: "Invalid username and password"
        })
      }
    }
    catch (err) {
      console.log(err)
    }
  }
  else {
    res.json({
      errorMsg: "User doesn't exist"
    })
  }

});

router.get("/users/:id", async (req, res) => {
  try {
    const data = await Users.findById(req.params.id)
    if (data) {
      res.status(200).json({
        userDetails: data
      })
    } else {
      res.status(500).json({
        msg: "something went wrong"
      })
    }
  } catch (err) {
    console.log(err);
  }
});


module.exports = router;
