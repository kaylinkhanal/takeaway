const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const jwt = require('jsonwebtoken');

  const tokenValidator = (req, res, next)=> {
    if(req.headers.authorization){
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
        if(err) return res.sendStatus(403)
        if(decoded)  next()
      });
    }else return res.sendStatus(403)
  };

  exports.tokenValidator = tokenValidator;