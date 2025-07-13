//check this middleware user is login or not
const jwt = require("jsonwebtoken");
const User= require("../models/User");
require("dotenv").config();
exports.protect= async(req,res,next)=>{
    try {
        const token = req.cookie.token; //extract the token from cookie
        if(!token){
            return res.status(401).json({message:"not authorized"});
        }
        const decoded= jwt.verify(token,process.env.JWT_SECRET);
        req.user= await User.findById(decoded.id).select("-password");
        next();
    } catch (error) {
           res.status(401).json({ message: "Invalid token" });
    }
}