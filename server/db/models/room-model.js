const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Room = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    members: { type: [String] },
    avatar: { type: Buffer },
  },
  { timestamps: true }
);

module.exports = mongoose.model("rooms", Room);
