const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Issue = new Schema(
  {
    projectId: { type: String, required: true },
    creatorId: { type: String, required: true },
    issueTypeId: { type: String, required: true },
    assigneeId: { type: String },
    priorityId: { type: String },
    epicId: { type: String },
    summary: { type: String, required: true },
    description: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("issues", Issue);
