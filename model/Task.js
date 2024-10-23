const mongoose = require("mongoose");
const Schema = mongoose.Schema;

//스키마 생성
const taskSchema = Schema(
  {
    task: {
      type: String,
      require: true,
    },
    isComplete: {
      type: Boolean,
      require: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      require: true,
      ref: "User", //외래키
    },
  },
  { timestamps: true }
);

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
