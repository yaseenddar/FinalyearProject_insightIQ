const mongoose = require("mongoose");

const AnswerSchema = new mongoose.Schema({
  answer: String,
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "questions",
  },
  user: Object,
});

module.exports = mongoose.model("Answers", AnswerSchema);
