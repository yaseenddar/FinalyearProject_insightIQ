const mongoose = require('mongoose');


const answerSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true,
    }
},{timestamps:true});

const Answer = mongoose.model('Answer',answerSchema);

module.exports = Answer;