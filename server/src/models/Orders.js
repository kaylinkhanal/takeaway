const mongoose = require("mongoose");

const ordersSchema = new mongoose.Schema(
  {
    maxLength:{type: String},
    pickupDate:{type: String},
    pickupTime:{type: String},
    senderId:{type: String},
    receiverName:{type: String},
    receiverPhoneNo:{type: Number},
    unitItems:{type: String},
    weight: {type: Number},
    catagoryName: { type: String },
    minimumDeliveryPrice: { type: Number },
  },
  { collection: "orders" }
);
module.exports = mongoose.model("Orders", ordersSchema);