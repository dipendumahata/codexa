const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary"); // ✅ Capital 'C'
const cloudinary = require("../utils/cloudinary");

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "codebazar", // optional: any folder in Cloudinary
    allowed_formats: ["jpg", "png", "jpeg"],
   
  },
});

const upload = multer({ storage });
module.exports = upload;
