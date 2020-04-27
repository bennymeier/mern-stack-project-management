const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const User = new Schema({
  firstname: {
    type: String,
    required: true,
  },
  lastname: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  status: {
    type: String,
  },
  role: {
    type: String,
    default: "Employee",
  },
  date: {
    type: Date,
    default: Date.now,
  },
});
module.exports = mongoose.model("users", User);
