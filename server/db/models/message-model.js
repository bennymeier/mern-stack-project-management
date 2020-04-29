const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Message = new Schema(
  {
    body: { type: String, required: true },
    from: { type: String, required: true },
    to: { type: String, required: true },
    isEdited: { type: Boolean, default: false },
  },
  { timestamps: true, autoIndex: true }
);

module.exports = mongoose.model("message", Message);
