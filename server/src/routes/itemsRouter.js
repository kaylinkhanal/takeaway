const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
  
router.post("/items", async (req, res) => {
    try {
      Items.findOne({ catagoryName: req.body.catagoryName }).then((item) => {
        if(!item){
          const itemData =  Items.create(req.body);
          
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

router.put("/items", async (req, res) => {
  try {
    const data = await Items.findByIdAndUpdate(req.body._id, req.body)
    if(data){
      res.status(200).json({msg: "updated successfully!"})
    }
  } catch (err) {
    console.log(err);
  }
});
  
router.get("/items", async (req, res) => {
try {
    const data = await Items.find()
    if(data){
        res.status(200).json({
            validItemOptions: data
        })
    }else{
        res.status(500).json({
            msg: "something went wrong"
        })
    }
} catch (err) {
    console.log(err);
}
});

router.delete("/items", async (req, res) => {
  console.log(req)
  try {
    const result = await Items.findByIdAndDelete(req.body._id)
    if(result){
      res.status(200).json({msg: 'deleted successfully'})
    }
    else{
      res.status(500).json({msg:"something went wrong"})
    }
  } catch (err) {
      console.log(err);
  }
  });
module.exports = router;
