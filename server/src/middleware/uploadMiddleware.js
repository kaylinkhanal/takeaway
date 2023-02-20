const express = require("express");
const router = express.Router();
const Users = require("../models/Users");
const multer = require('multer')

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '../client/src/uploads')
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname)
    
  }
})

const upload = multer({ storage: storage }).single('avatar')

exports.upload = upload;