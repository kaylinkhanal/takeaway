const express = require("express");
const router = express.Router();
const Orders = require("../models/Orders");
  
// router.post("/orders", async (req, res) => {
//     try {
//         const dbResponse = await Orders.create(req.body)
//         if(dbResponse){
//             res.status(200).json({
//                 msg: "orders dispatched successfully"
//             })
//         }
//     } catch (err) {
//       console.log(err);
//     }
//   });

//   router.get("/orders", async (req, res) => {
//     try {
//         const data = await Orders.find()
//         if(data){
//             res.status(200).json({
//                 data:data
//             })
//         }
//     } catch (err) {
//       console.log(err);
//     }
//   });


router.post("/orders", async (req, res) => {
  try {
    const {pickupDate,
      pickupTime,
      weight,
      unitItems,
      maxLength,
      receiverName,
      receiverPhoneNo } = req.body;
    let orders = new Orders({
      pickupDate,
      pickupTime,
      weight,
      unitItems,
      maxLength,
      receiverName,
      receiverPhoneNo
    });
    orders = await orders.save();
    res.json({ msg: "orders dispatched successfully", ordersList: orders});
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


// Get all your orders
router.get("/get-orders", async (req, res) => {
  try {
    const orders = await Orders.find({});
    res.json({ordersList: orders});
    // sending json(order data) back to client side
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

module.exports = router;
