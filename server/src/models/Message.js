const mongoose = require("mongoose");

const meesageSchema = new mongoose.Schema(
  {
    senderId:{type: String},
    receiverId:{type: String},
    message:{type: String}
  },
  { collection: "message" }
);
module.exports = mongoose.model("Message", meesageSchema);