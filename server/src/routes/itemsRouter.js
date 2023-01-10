const express = require("express");
const router = express.Router();
const Items = require("../models/Items");
  
router.post("/additem", async (req, res) => {
    try {
      Items.findOne({ catagoryName: req.body.catagoryName }).then((item) => {
        if(!item){
          const itemData =  Items.create(req.body);
           console.log(itemData);
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
   console.log(data)
} catch (err) {
    console.log(err);
}
});
module.exports = router;
