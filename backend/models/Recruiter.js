const mongoose = require("mongoose");

const RecruiterSchema= new mongoose.Schema({
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true
        },
        companyName:{
            type:String,
            required:true
        },
        destination:{
            type:String,
        },
        companyEmail:{
            type:String,
            required:true
        },
        companyWebsite:{
            type:String
        },
        linkden:{
            type:String,

        },
        purpose:{
            type:String,
            enum:["hiring","mentorship","collaboration"],
            required:true
        }

},{timestamps:true});

module.exports= mongoose.model("Recruiter",RecruiterSchema)