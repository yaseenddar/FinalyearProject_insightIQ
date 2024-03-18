const jwt = require('jsonwebtoken')
require('dotenv').config();
const jwtAuthMiddleware = (req,res,next) =>{
    //check for the auhtorzation 
const authorization = req.headers.authorization;
if(!authorization) res.status(401).json({error:" Token not found"})
    const token = req.headers.authorization.split(' ')[1];
// console.log("this is token",token)
    if(!token) return res.status(401).json({error: 'Unauthorized'});
        try {

            const decoded = jwt.verify(token,process.env.JWT_SECRET);
            req.user = decoded;
            next();
        } catch (error) {
            console.log(error);
            res.status(401).json({error: "Invalid token"});
            
        }
    
}

const generateToken = (userData) =>{
    return jwt.sign(userData,process.env.JWT_SECRET,{expiresIn:30000});
}
module.exports = {jwtAuthMiddleware,generateToken};