const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema(
  {
    name: { type: String },
    address: { type: String},
    email: { type: String },
    password: { type: String },
    role: { type: String},
    avatarName: {type: String}
  },
  { collection: "users" }
);
module.exports = mongoose.model("Users", usersSchema);
