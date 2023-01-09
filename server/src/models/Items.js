const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    catagoryName: { type: String },
    price: { type: Number },
  },
  { collection: "items" }
);
module.exports = mongoose.model("Items", itemSchema);