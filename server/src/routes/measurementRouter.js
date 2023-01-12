const express = require("express");
const router = express.Router();
const Measurement = require("../models/measurement");

  
router.post("/addmeasurement", async (req, res) => {
    try {
     Measurement.findOne({ parameterName: req.body.parameterName }).then((item) => {
        if(!item){
          const measurementData =  Measurement.create(req.body);
           console.log(measurementData);
          if (measurementData) {
            res.json({ msg: "measurement is added" });
          } else {
            res.json({ msg: "something went worng" });
          } 
        }
        else{
          res.status(409).json({ error: "already exists" });
        }
   
      });
    } catch (err) {
      console.log(err);
    }
  });
  
router.get("/measurement", async (req, res) => {
try {
    const data = await Measurement.find()
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
