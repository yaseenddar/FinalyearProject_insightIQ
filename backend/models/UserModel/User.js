const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
	userName:{
		type:String,
		required:true,
		min:3,
		max:20,
		
	},
	userEmail:{
		type:String,
		required:true,
		max:50,
        unique:true
		
	},
	password:{
		type:String,
		unique:true,
		required:true,
		min:6,
	},
	address:{
		city:String,
	},
	profilePicture:{
		type:String,
		default:"",
	},
	followers:{
		type:Array,
		default:[],//we will keeep user ids of the users
	},
	followings:{
		type:Array,
		default:[],//we will keeep user ids of the users
	},
    posts:[
        {
            type:mongoose.Schema.Types.ObjectId,
            ref:'Question'
        }
    ],
	googleLogin:{
		type:Boolean,
		required:true
	},

},
{timestamps:true}
);
module.exports = mongoose.model("User",UserSchema);