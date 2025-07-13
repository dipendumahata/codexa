const express = require("express");
const router = express.Router();
const upload= require("../middleware/multer");
const auth = require("../middleware/auth")
const photocontroller = require("../controllers/cloudinaryConrolller")


router.post("/", auth, upload.single("image"),photocontroller.createPhoto);
router.get("/", auth , photocontroller.getPhoto);
router.delete("/:id",auth,photocontroller.deletePhoto)


module.exports=router;
