const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
const jwt = require('jsonwebtoken');

const PostOrder = async (req, res) => {
    try {
        const dbResponse = await Orders.create(req.body)
        console.log(dbResponse.orderStatusId)
        if(dbResponse){
            res.status(200).json({
                msg: "orders dispatched successfully"
            })
        }
    } catch (err) {
      console.log(err);
    }
  };

const PatchOrder = async (req, res) => {
    try {
       console.log(req.body)
        const data =await  Orders.findByIdAndUpdate(req.body.id, {"orderStatus": "Accepted"})
        
    } catch (err) {
      console.log(err);
    }
  }; 

  const tokenValidator = (req, res, next)=> {
    if(req.headers.authorization){
      const token = req.headers.authorization.split(' ')[1]
      jwt.verify(token, process.env.SECRET_TOKEN, function(err, decoded) {
        if(err) return res.sendStatus(403)
        if(decoded)  next()
      });
    }else return res.sendStatus(403)
  }

const GetOrder = async (req, res) => {
    try {
        const totalOrdersLength = await Orders.find()
        if(req.query.senderId){
          const data = await Orders.find({"senderId":req.query.senderId})
          res.status(200).json({
            orders: data
        })
        }else{
         const docsFilteredByStatus =  req.query.role == 'admin' ? {} : { orderStatus: { $nin:[ 'Pending' ]} }
         const data = await Orders.find(docsFilteredByStatus).limit(req.query.size).skip(req.query.size* req.query.page - req.query.size)
 
          if(data){
              res.status(200).json({
                  orders:data,
                  totalOrdersCount: totalOrdersLength.length
              })
          }
        }
       
    } catch (err) {
      console.log(err);
    }
  };

  const DeleteOrder = async (req, res) => {
    try {
      const data = await Orders.findByIdAndDelete(req.body._id)
      if(data){
        res.status(200).json({msg: 'deleted successfully'})
      }
      else{
        res.status(500).json({msg:"something went wrong"})
      }
    } catch (err) {
        console.log(err);
    }
    };

    const PutOrder = async (req, res) => {
      try {
        const data = await Orders.findByIdAndUpdate(req.body._id, req.body)
        if(data){
          res.status(200).json({msg: "updated successfully!"})
        }
        else{
          res.status(500).json({msg:"something went wrong"})
        }
      } catch (err) {
        console.log(err);
      }
    };
      

    exports.PostOrder = PostOrder;
    exports.PatchOrder = PatchOrder;
    exports.GetOrder = GetOrder;
    exports.DeleteOrder = DeleteOrder;
    exports.PutOrder = PutOrder;
