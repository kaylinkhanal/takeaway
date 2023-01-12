const mongoose = require("mongoose");

const measurementSchema = new mongoose.Schema(
  {
    ParameterName: { type: String },
    minimumDeliveryPrice: { type:String },
  },
  { collection: "measurement" }
);
module.exports = mongoose.model("Measurement", measurementSchema);