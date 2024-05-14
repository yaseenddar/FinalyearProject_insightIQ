const router = require("express").Router();
const User = require('../models/UserModel/User')
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken');
const { generateToken } = require("./jwt");

//register a user to the social app
router.post("/register",async (req,res)=>{
	

	const { userName, userEmail, password,profilePicture,googleLogin} = req.body;
	 const existingUser = await User.findOne({ userEmail });
        if (existingUser) {
			const data = {userEmail:existingUser.userEmail,id:existingUser.id}
			const token = generateToken(data);
            return res.json({existingUser,token:token});
        }

        let securePassword;
        securePassword = await bcrypt.hash(password,10);//10 rounds of hashing
	try{
		 const user = await User.create({
            userName, userEmail, password:securePassword,profilePicture:profilePicture,googleLogin:googleLogin
        });
		const token = generateToken({userEmail:user.userEmail,id:user.id})
		user.password = 'undefined';
	 res.status(200).json({
		success:true,
        user:user,
		token:token
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
      
	// verify the user if in token
	const authorization = req.headers.authorization;
    if(authorization){
		// console.log(authorization)
	try {
		const token = req.headers.authorization.split(' ')[1];
		try {

            const decoded = jwt.verify(token,process.env.JWT_SECRET);
			// console.log("decoded",decoded)
            userEmail = decoded.userEmail;
			const user = await User.findOne({userEmail});
		user.password = null;
		return res.status(200).json({
			user,
			token,
			message:"verified by token"
		});
        } catch (error) {
			try{

				const {userEmail,password} = req.body;
						 //check if user is not providing the password and email 
					   
				if(!userEmail || !password){
					return res.status(400).json({
						success:false,
						message:"please fill the details carefylly",
	   
					});}
				const user = await User.findOne({userEmail});
			   // console.log("user in user",user)
				if(!user){
				   return res.status(404).json({
					   message:"user not found"});
			   }
	   
				const validPassword = await bcrypt.compare(password,user.password);
				if(!validPassword){
					res.status(400).json({
						success:false,
						message:"wrong password! please enter correct one",
					});
				}
	   
				else{
				   const payload ={
					   id:user.id,
					   userEmail:user.userEmail
				   }
				   const token = generateToken(payload);
				   user.password = null;
					return res.status(200).json({user,token
					})
				}
			}catch(err){
					console.error(err);
					 res.status(500).json({message:"error occured while logging in"})
				}        
        }
		

	} catch (error) {
		console.log("error in finding the user with token info")
	}
}
 	
 	
 })

 // forgot password route
 router.post("/changepassword", async (req, res) => {
    try {
        const { userEmail, oldPassword, newPassword } = req.body;
        
        // Find the user in the database based on the provided email
        const user = await User.findOne({ userEmail });
		console.log("user", user,userEmail)
        if (!user) {
            return res.status(404).json({ success: false, message: "User not found." });
        }

        // Verify that the old password matches the password stored in the database
        const validPassword = await bcrypt.compare(oldPassword, user.password);
        if (!validPassword) {
            return res.status(401).json({ success: false, message: "Incorrect old password." });
        }

        // Hash the new password
        const hashedNewPassword = await bcrypt.hash(newPassword, 10);

        // Update the user's password in the database
        user.password = hashedNewPassword;
        await user.save();

        return res.status(200).json({ success: true, message: "Password changed successfully." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ success: false, message: "Error changing password." });
    }
});


module.exports = router;



