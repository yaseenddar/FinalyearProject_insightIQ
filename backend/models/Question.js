const mongoose =  require("mongoose");

const questionSchema = mongoose.Schema({
    questionName:{
        type:String,
        required:true
    },
    questionUrl:{
        type:String
    },
    user:{
        type:String
    },
    answers:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Answer'
        }
    ]
},{timestamps:true});

const Questoin = mongoose.model('Question',questionSchema);

module.exports = Questoin;