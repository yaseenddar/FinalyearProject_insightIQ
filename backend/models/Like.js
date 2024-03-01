const mongoose = require("mongoose");
//this model will store on which model the user has liked and on which commment also for that 
//we 'll have the two objects to strore one is Question and another is Answer model
const likeSchema = mongoose.Schema({
    onModel:{
        type:String,
        required:true,
        enum:['Questions','Answers']
    },
    likeable:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        refPath:'onModel'//for two objects refPath is given 
    },

},{timestamp:true});
export default Like = mongoose.model('Like',likeSchema);

