const mongoose = require("mongoose");
const adminSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true,
    },
    department:{
        type:String,
        required:true,
    },
    adminCodeUsed:{
        tyrpe:String
    }
},{timestamps:true});

module.exports = mongoose.model("Admin",adminSchema);
