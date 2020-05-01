const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const IssueFileupload = new Schema(
  {
    data: { type: Buffer, required: true },
    contentType: { type: String, required: true },
    issueId: { type: Schema.Types.ObjectId, ref: "issues", required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("issuefiles", IssueFileupload);
