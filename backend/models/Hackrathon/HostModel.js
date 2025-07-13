const mongoose= require("mongoose");


const faqSchema= new mongoose.Schema({
      question: String,
  answer: String,
})

const scheduleSchema= new mongoose.Schema({
     time: String, // e.g., "10:00 AM - 11:00 AM"
  activity: String, // e.g., "Opening Ceremony"
})

const hackathonSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true,
    },
    hostName:{
        type:String,
        required:true
    },
    sortDescription:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    coverImage:{
        type:String,
        required:true
    },
    logoImage:{
        type:String,
        required:true
    },
    location:{
        type:String,
        required:true
    },
    registrationLink: {
    type: String,
    required: true,
  },
  startDate:{
    type:Date,
    required:true
  },
  endDate:{
    type:Date,
    required:true
  },
  registrationDeadline: {
    type: Date,
  },
   resultDate: {
    type: Date,
  },
  eligibility: {
    type: String, // e.g., College students
  },
  teamSizeMin: {
    type: Number,
    default: 1,
  },
  teamSizeMax: {
    type: Number,
    default: 4,
  },
  isFree: {
    type: Boolean,
    default: true,
  },
  registrationFee: {
    type:Number,
  },
  judgingCriteria: {
    type: String,
  },
  prizes: {
    type: String,
  },
  sponsors: [String], // Optional list of sponsors
  categories: [String], // e.g., ['AI', 'Web', 'Blockchain']
  tags: [String], // e.g., ['college', 'innovation']
  guidelines: {
    type: String,
  },
  faq:[faqSchema],
  schedule:[scheduleSchema],

    contactEmail: {
    type: String,
  },
  contactPhone: {
    type: String,
  },
  createdBy:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },

},{timestamps:true})

module.exports=mongoose.model("Hackathon",hackathonSchema);