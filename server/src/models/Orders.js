const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    pickupDate:{type: String},
    pickupTime:{type: String},
    senderId:{type: String},
    receiverName:{type: String},
    receiverPhoneNo:{type: Number},
    unitItems:{type: String},
    weight: {type: Number},
    catagoryName: { type: String },
    orderStatus: { type: String },
    minimumDeliveryPrice: { type: Number },
    distance:{type: Number},
    discount:{type: Number},
 
  },
  { collection: "orders" }
);
module.exports = mongoose.model("Orders", ordersSchema);