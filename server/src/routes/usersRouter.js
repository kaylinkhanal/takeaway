const express = require("express");
const { db } = require("../models/Users");
const router = express.Router();
const Users = require("../models/Users");

router.post("/register", async (req, res) => {
  try {
    Users.findOne({ email: req.body.email }).then((user) => {
      if (!user) {
        //create User.
        const userData = Users.create(req.body);
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

module.exports = router;
