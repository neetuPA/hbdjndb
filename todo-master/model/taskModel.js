const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  //  id: {
  //   type: String,
  //   unique: true,
  //   default: () => new Date().getTime().toString(), 
  // },
  title: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  status: {
    type: String,
    enum: ["pending", "completed"],
    default: "pending"
  }
});

module.exports = mongoose.model("Task", taskSchema);
