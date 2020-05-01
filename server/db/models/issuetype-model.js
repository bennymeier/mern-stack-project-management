const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueType = new Schema(
  {
    id: { type: String, unique: true, required: true },
    label: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("issuetypes", IssueType);
