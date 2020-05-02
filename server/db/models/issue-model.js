const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Issue = new Schema(
  {
    projectId: { required: true, type: Schema.Types.ObjectId, ref: "projects" },
    creatorId: { required: true, type: Schema.Types.ObjectId, ref: "users" },
    issueTypeId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "issuetypes",
    },
    assigneeId: { type: String },
    priorityId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "priorities",
    },
    epicId: { type: String },
    summary: { type: String, required: true },
    description: { type: String },
    statusId: {
      required: true,
      type: Schema.Types.ObjectId,
      ref: "kanbantypes",
    },
    index: { type: Number },
  },
  { timestamps: true }
);

module.exports = mongoose.model("issues", Issue);
