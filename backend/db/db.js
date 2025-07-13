const mongoose= require("mongoose");
require("dotenv").config()

const connectDb= async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Mongoose Connected Sucessfully !!")
    } catch (error) {
        console.log("DB connection Failed !!")
        console.error('Db Error ',error);
    }
}
module.exports=connectDb;