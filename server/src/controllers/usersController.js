const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const bcrypt = require("bcrypt")
const multer = require('multer')
var jwt = require('jsonwebtoken');

const PostProfile = async(req, res) => {
  console.log(req.file)
  const data = await Users.findByIdAndUpdate(req.body._id, { avatarName: req.file.filename }).lean()
  if (data) {
    res.status(200).json({
      msg: "imageUploaded Successfully"
    })
  }
};

const PutChangePassword = async (req, res) => {
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
};

const GetUsers = async (req, res) => {
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
};

exports.PostProfile = PostProfile;
exports.PutChangePassword = PutChangePassword;
exports.GetUsers = GetUsers;
