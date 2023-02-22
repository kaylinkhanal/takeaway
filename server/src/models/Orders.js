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
    categoryName: { type: String },
    orderStatus: { type: String },
    orderStatusId: {type: Number, default: 1 },
    minimumDeliveryPrice: { type: Number },
    distance:{type: Number},
    discount:{type: Number},
 
  },
  { collection: "orders" }
);


module.exports = mongoose.model("Orders", ordersSchema);