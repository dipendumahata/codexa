const mongoose = require("mongoose");

const phtoSchema = new mongoose.Schema({
    title:String,
    imageUrl:String,
    imageId:String,  //cloudinary ID for deletion
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
    },
},{timestamps:true})
module.exports=mongoose.model("Photo",phtoSchema)