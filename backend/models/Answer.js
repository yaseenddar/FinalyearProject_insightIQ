const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answer: {
    type:String,
    max:[200,"must be less than 500 cahracters"],
  },
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  },
  user: Object,
},{timestamps:true});

module.exports = mongoose.model("Answers", AnswerSchema);
