const mongoose= require("mongoose");

const StudentSchema= new mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    college:{
        type:String,
        required:true,
    },
    course:{
        type:String,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    yearOfStudy:{
        type:String,
        enum:["1st","2nd","3rd","4th"],
        required:true
    },
    github:{
        type:String,

    },
    linkden:{
        type:String
    },
    website:{
        type:String
    },
    collegeIdCardUrl:{
        type:String
    }

},{timestamps:true});
module.exports=mongoose.model("Student",StudentSchema)