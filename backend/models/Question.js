const mongoose = require("mongoose");

const QuestionSchema = new mongoose.Schema({
  questionName: {
    type:String,
    max:[500,"must be less than 500 cahracters"],
    required:true
  },
  likes: {
    type: Array,
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  answers:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Answers",
  }
],
  user: Object,
},{timestamps:true});

module.exports = mongoose.model("Questions", QuestionSchema);
