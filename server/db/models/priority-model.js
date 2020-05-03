const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Priority = new Schema(
  {
    id: { type: String, unique: true, required: true },
    label: { type: String, required: true },
    color: { type: String },
    icon: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("priorities", Priority);
