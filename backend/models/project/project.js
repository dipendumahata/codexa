const mongoose=require("mongoose");

const projectSchema = new mongoose.Schema({
    title: String,
    description: String,
    logoUrl: String,
    coverImageUrl: String,
    price: String,
    owner: {
  type: mongoose.Schema.Types.ObjectId,
  ref: "User", // 🔥 must match the User model name
},
    tags: [String],
    learning: [String],
    stars: Number,
    likes:[{type:mongoose.Schema.Types.ObjectId,ref:"User"}],
    Comment:[
        {
            user:{type:mongoose.Schema.Types.ObjectId , ref:"User"},
            text:String,
            createdAt:{type:Date,default:Date.now},
        }
    ]
},{timestamps:true});

module.exports=mongoose.model("Project",projectSchema);