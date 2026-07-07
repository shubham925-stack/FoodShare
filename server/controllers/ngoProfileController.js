const NGOProfile=require("../models/NGOProfile");
const User=require("../models/User")
const authMiddleware = require("../middleware/authMiddleware")
const createNGOProfile=async(req,res)=>{
    try{
        const userId=req.user.id
        const{
            ngoName,
            address,
            backupContact,
            verificationDocuments
        }=req.body
        //check if user exists
        const user = await User.findById(userId);
        if(!user){
            return res.status(404).json({
                message:"user not found"
            })
        };
        //check user role
        if(user.role!=="NGO"){
            return res.status(403).json({
                message:"Only NGO users can create NGO Profile"
            })
        };
        //check if profile already exists
        const existingNGO=await NGOProfile.findOne({userId});
        if(existingNGO){
            return res.status(400).json({
                message:"NGO Profile already exists"
            });
        };
        const ngoProfile = await NGOProfile.create({
            userId,
            ngoName,
            address,
            backupContact,
            verificationDocuments
        });
        res.status(200).json({
            message:"NGO profile created successfully",ngoProfile
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
   }
}
//get ngo deatils
const getNGOProfileById=async(req,res) => {
    try{
        const userId=req.user.id;
        const ngoProfile=await NGOProfile.findOne({userId}).populate("userId")
        if(!ngoProfile){
            return res.status(404).json({
                message:"NGO profile not found"
            })
        }
        return res.status(200).json({
            message:"NGO profile fetched successfully",ngoProfile
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
   }
}
//update ngo details

const updateNGOProfile=async(req,res)=>{
    try{
        const userId=req.user.id;
        const ngoProfile=await NGOProfile.findOneAndUpdate(
            {userId},
            req.body,
            {
                new:true,
                runValidators:true
            }
        ).populate("userId")
        if(!ngoProfile){
            return res.status(404).json({
                message:"NGO Profile not found"
            });
        }
        return res.status(200).json({
            message:"NGO profile updated successfully",ngoProfile
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
   }
}
//delete ngoProfile

const deleteNGOProfile=async(req,res)=>{
try{
    const userId=req.user.id;
    const ngoProfile= await NGOProfile.findOneAndDelete({userId});
    if(!ngoProfile){
        return res.status(404).json({
            message:"NGO profile not found"
        });
    }
    return res.status(200).json({
        message:"NGO profile deleted Successfully"
    })
   }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
   }
}
//get all ngos detail
const getAllNGOProfiles=async(req,res)=>{
    try{
        const ngoProfiles=await NGOProfile.find().populate("userId");
        return res.status(200).json({
            message:"NGO profiles fetched successfully",ngoProfiles
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
   }
}

module.exports={
    createNGOProfile,
    getNGOProfileById,
    updateNGOProfile,
    deleteNGOProfile,
    getAllNGOProfiles
}