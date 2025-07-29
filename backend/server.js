const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // ✅ Needed for cookies
require("dotenv").config();

const authRoutes = require("./router/authRoute");
const hackathonRoutes = require("./router/hackathonRoutes");
const ProjectRoutes= require("./router/projectRoutes")
const connectDb = require("./db/db");

//islogin
const auth=require("./middleware/auth")

const app = express();
connectDb();
app.use(express.json())

const allowedOrigins = [
  "http://localhost:5173",
  "https://code-bazaar-student-project-showcas.vercel.app"
];

app.use(cors({
  origin: function(origin, callback) {
    // Allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);

    if(allowedOrigins.indexOf(origin) === -1) {
      const msg = `The CORS policy for this site does not allow access from the origin: ${origin}`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));
// ✅ Needed to read req.cookies
app.use(cookieParser());

//
app.use("/api/photos",require("./router/photoRoute"))
app.use("/api/hackathons",hackathonRoutes);
app.use("/api/projects",ProjectRoutes);

app.use(express.json());
app.use("/api", authRoutes);


//end ponit to check for is user{ loggedIn hai ya nhi}
app.get("/api/check-auth-status",auth,(req,res)=>{
  //age ye chla matlb login hai user warna nhi hai ye hame auth middleware se oata chalega
  res.status(200).json({isLoggedIn:true ,user:req.user});// req.user में authenticated user की जानकारी होगी
})


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is listening on Port ${PORT}`);
});
