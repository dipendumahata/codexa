const mongoose = require("mongoose");
require("dotenv").config();

const connectDb = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // useNewUrlParser: true,
      // useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000, // 5 seconds timeout
    });
    console.log("MongoDB Connected Successfully !!");
  } catch (error) {
    console.error("DB Connection Failed !!");
    console.error("Db Error: ", error);
    process.exit(1); // Exit process if DB connection fails
  }
};

module.exports = connectDb;
