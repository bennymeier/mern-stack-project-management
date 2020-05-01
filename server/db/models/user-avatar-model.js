const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserAvatar = new Schema(
  {
    destination: { type: String, required: true },
    filename: { type: String, required: true },
    size: { type: Number, required: true },
    contentType: { type: String, required: true },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
      unique: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("useravatar", UserAvatar);
