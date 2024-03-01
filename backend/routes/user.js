const router = require("express").Router();
const User = require('../models/UserModel/User')
const bcrypt = require("bcrypt")


//register a user to the social app
router.post("/register",async (req,res)=>{
	

	// const newUser = await new User({
	// 	username:req.body.username,
	// 	email:req.body.email,
	// 	password:req.body.password,
	// })

	//if any error occured in saving 
	const { userName, userEmail, password,profilePicture,googleLogin} = req.body;
	 const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: 'User already  Exists',
            });
        }

        let securePassword;
        securePassword = await bcrypt.hash(password,10);//10 rounds of hashing
	try{
		 const user = await User.create({
            userName, userEmail, password:securePassword,profilePicture:profilePicture,googleLogin:googleLogin
        });
	 // await newUser.save();//saves the document into the database if not present already
	 res.status(200).json({
		success:true,
        user:user,
		message:"The user was created in database successfully"
	})
}	
catch(err){
	console.error(err)
	res.status(404).json({
	success:false,
	message:"Error occured in creating the user"
});
}
});

//login verification
 router.post("/login",async(req,res)=>{

 	try{
 		const {userEmail,password} = req.body;
 		 		//check if user is not providing the password and email 
 		if(!userEmail || !password){
 			return res.status(400).json({
 				success:false,
 				message:"please fill the details carefylly",

 			});}
 		const user = await User.findOne({userEmail});
 		if(!user){
            return res.status(404).json("user not found");
        }

 		const validPassword = await bcrypt.compare(password,user.password);
 		if(!validPassword){
 			res.status(400).json({
 				success:false,
 				message:"wrong password! please enter correct one",
 			});
 		}

 		else{
 			return res.status(200).json({user,
 			})
 		}
 	}catch(err){
 			console.error(err);
 			 res.status(500).json("error occured while logging in")
 		}
 	
 })

module.exports = router;



