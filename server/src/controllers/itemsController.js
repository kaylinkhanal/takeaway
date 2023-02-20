const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
const multer = require('multer')

const PostItems = async (req, res) => {
    try {
      Items.findOne({ catagoryName: req.body.catagoryName }).then((item) => {
        if (!item) {
  
          const body = req.body;
          const items = new Items({
            catagoryName: body.catagoryName,
            minimumDeliveryPrice: body.minimumDeliveryPrice,
            photo: req?.file?.filename,
          });
          items.save()
  
          if (items) {
            res.json({ msg: "Item is added" });
          } else {
            res.json({ msg: "something went worng" });
          }
        }
        else {
          res.status(409).json({ error: "item already exists" });
        }
  
      });
    } catch (err) {
      console.log(err);
    }
  };

const PutItems = async (req, res) => {
  try {
    const data = await Items.findByIdAndUpdate(req.body._id, req.body)

    if (data) {
      res.status(200).json({ msg: "updated successfully!" })
    }
  } catch (err) {
    console.log(err);
  }
};

const GetItems = async (req, res) => {
  const { qSearch } = req.query;
  const search = (validItems) => {
    return validItems.filter((items) =>
      items.catagoryName?.toLowerCase()?.includes(qSearch?.toLowerCase())
    )
  }
  try {
    const data = await Items.find()
    if (data) {
      res.status(200).json({
        validItemOptions: search(data)
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

const DeleteItems = async (req, res) => {
  try {
    const data = await Items.findByIdAndDelete(req.body._id)
    if (data) {
      res.status(204).json({ msg: 'deleted successfully' })
    }
  } catch (err) {
    console.log(err);
  }
};
exports.PostItems = PostItems;
exports.PutItems = PutItems;
exports.GetItems = GetItems;
exports.DeleteItems = DeleteItems;
