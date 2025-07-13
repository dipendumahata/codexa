const Hackathon = require("../models/Hackrathon/HostModel");

// @desc Create hackathon
exports.createHackathon = async (req, res) => {
  try {
    const {title,hostName, ...restField}=req.body;

    //upload cover image or logo image
    const coverImage=req.files?.coverImage?.[0]?.path;
    const logoImage=req.files?.logoImage?.[0]?.path;

    if(!coverImage || !logoImage){
      return res.status(400).json({message:"both image are required!!"});
    }

        const hackathon= await Hackathon.create({
          title,
          hostName,
          ...restField,
          coverImage,
          logoImage,
          createdBy:req.user._id
        })
        res.status(201).json(hackathon);


  } catch (error) {
    res.status(400).json({ message: err.message });
  }
      
};

// @desc Get all hackathons
exports.getAllHackathons = async (req, res) => {
  try {
    const hackathons = await Hackathon.find().sort({ createdAt: -1 });
    res.status(200).json(hackathons);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Get single hackathon by ID
exports.getHackathonById = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ message: "Not found" });
    res.status(200).json(hackathon);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// @desc Update hackathon
exports.updateHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ message: "Not found" });

    // Optional: Check if user is the host
    if (String(hackathon.createdBy) !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    const updated = await Hackathon.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// @desc Delete hackathon
exports.deleteHackathon = async (req, res) => {
  try {
    const hackathon = await Hackathon.findById(req.params.id);
    if (!hackathon) return res.status(404).json({ message: "Not found" });

    if (String(hackathon.createdBy) !== req.user._id.toString()) {
      return res.status(403).json({ message: "Unauthorized" });
    }

    await hackathon.deleteOne();
    res.status(200).json({ message: "Hackathon deleted" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
