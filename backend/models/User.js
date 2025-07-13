const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    mobile: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["student", "recuritor", "admin"], // ✅ match values from frontend
      required: true,
    },
    profilePicture: {
      type: String,
    },

    // Student fields
    collegeName: String,
    branch: String,
    github: String,
    linkedin: String,

    // Recruiter fields
    companyName: String,
    designation: String,
    companyWebsite: String,
    recruiterLinkedin: String,

    // Admin fields
    adminDept: String,
    adminCode: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);
