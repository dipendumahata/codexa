const { request } = require("express");
const Photo=require("../models/Photo")

const cloudinary= require("../utils/cloudinary");

exports.createPhoto= async (req,res)=>{
    try {
        const result= await cloudinary.uploader.upload(req.file.path);

        const newPhoto= new Photo({
            title:req.body.title,
            imageUrl:result.secure_url,
            imageId:result.public_id,
            createdBy:req.user._id
        })
        await newPhoto.save();
        res.status(201).json(newPhoto);
        
    } catch (error) {
        res.status(500).json({error:"Upload Failed" , error:error.message})
        
    }
}


exports.getPhoto= async(req,res)=>{
    const quary= req.user.role === "admin"
     ?{}
     :{createdBy:req.user._id}

     try {
        const photos= await Photo.find(quary).sort({createdAt: -1 })
        res.json(photos);
        
     } catch (error) {
        res.status(500).json({message:"Failed to fetch Photos"})
     }
};

exports.deletePhoto= async(req,res)=>{
    try {
        const photo= await Photo.findById(req.params.id);
        if(!photo){
            return res.status(404).json({message:"Photo not found"})
        }
        //only admin and owner can delete

        if(photo.createdBy.toString()=== req.user._id.toString() || req.user.role=== "admin"){
            await cloudinary.uploader.destroy(photo.imageId);
            await photo.deleteOne();
            res.status(200).json({message:"Photo deleted"})
        }
    } catch (error) {
        res.status(500).json({ message: "Deletion failed" });
    }
}