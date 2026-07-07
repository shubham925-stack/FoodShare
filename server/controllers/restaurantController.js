const RestaurantProfile = require("../models/RestaurantProfile")
const authMiddleware = require("../middleware/authMiddleware")
//creating restaurant profile
const createRestaurantProfile=async(req,res)=>{
    try{
        const userId=req.user.id
        const{
            restaurantName,
            restaurantType,
            address,
            verificationDocuments,
            acceptingDonations
        }=req.body;
        const existingProfile = await RestaurantProfile.findOne({userId})
        if(existingProfile){
            return res.status(400).json({
                message:"Restaurant profile already exist"
            });
        };
        const profile = await RestaurantProfile.create({
            userId,
            restaurantName,
            restaurantType,
            address,
            verificationDocuments,
            acceptingDonations
        });
        res.status(201).json({
            message:"Restaurant profile created successful",profile
        });
    }catch(error){
        console.log(error)
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
//getting restaurant details
const getRestaurantProfile=async(req,res)=>{
    try{
        const userId =req.user.id;
        const profile = await RestaurantProfile.findOne({userId});
        if(!profile){
            return res.status(404).json({
                message:"Restaurant profile not found"
            });
        }
        res.status(200).json({
            message:"Restaurant profile found successfully",profile
        });
    } catch (error){
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}
//update restaurant profile
const updateRestaurantProfile=async(req,res)=>{
    try{
        const userId=req.user.id;

        const updatedProfile=await RestaurantProfile.findOneAndUpdate(
            {userId},
            req.body,
            {
                new:true,
                runValidators:true
            }
        );
        if(!updatedProfile){
            return res.status(404).json({
                message:"Restaurant profile not found"
            })
        }
        res.status(200).json({
            message:"Restaurant profile updated successfully",
            profile:updatedProfile
        })
    }catch(error){
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}
//delete restaurant profile
const deleteRestaurantProfile=async(req,res)=>{
    try{
        const userId=req.user.id;
        const deletedProfile= await RestaurantProfile.findOneAndDelete({
            userId
        });
        if(!deletedProfile){
            return res.status(404).json({
                message:"Restaurant profile not found"
            });
        }
        res.status(200).json({
            message:"Restaurant profile deleted successfully"
        });
    }catch(error){
        res.status(500).json({
            message:"Internal server error",
            error:error.message
        })
    }
}
module.exports={
    createRestaurantProfile  ,
    getRestaurantProfile,
    updateRestaurantProfile,
    deleteRestaurantProfile
};

