const RestaurantProfile=require("../models/RestaurantProfile")
const NGOProfile=require("../models/NGOProfile")
const FoodDonation=require("../models/FoodDonation")

const getDashboard=async(req,res)=>{
    try{
        const totalRestaurants=await RestaurantProfile.countDocuments()
        const totalNGOs=await NGOProfile.countDocuments()
        const totalDonations=await FoodDonation.countDocuments()
        const activeDonations=await FoodDonation.countDocuments({
            donationStatus:"Available"
        })
        res.status(200).json({
            message:"Dashboard fetched successfully",
            dashboard:{
                totalRestaurants,
                totalNGOs,
                totalDonations,
                activeDonations
            }
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

const getAllRestaurants=async(req,res)=>{
    try{
        const restaurants=await RestaurantProfile.find();
        res.status(200).json({
            message:"Restaurants fetched successfully",restaurants
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}

const getAllNGOs=async(req,res)=>{
    try{
    const ngos=await NGOProfile.find();
    res.status(200).json({
        message:"NGOs fetched successfully",ngos
    })
}catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
const verifyRestaurant = async(req,res)=>{
    try{
        const restaurant=await RestaurantProfile.findById(req.params.id);
        if(!restaurant){
            return res.status(404).json({
                message:"restaurant not found"
            })
        }
        restaurant.verificationStatus="Verified";
        restaurant.verificationDocuments.forEach(doc=>{
            doc.verificationStatus="Verified"
        })
        await restaurant.save();
        res.status(200).json({
            message:"restaurant verified Successfully",restaurant
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
const rejectRestaurant = async(req,res)=>{
    try{
        const restaurant=await RestaurantProfile.findById(req.params.id);
        if(!restaurant){
            return res.status(404).json({
                message:"restaurant not found"
            })
        }
        restaurant.verificationStatus="Rejected";
        restaurant.verificationDocuments.forEach(doc=>{
            doc.verificationStatus="Rejected"
        })
        await restaurant.save();
        res.status(200).json({
            message:"restaurant rejected Successfully",restaurant
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
const verifyNGO = async(req,res)=>{
    try{
        const ngo=await NGOProfile.findById(req.params.id);
        if(!ngo){
            return res.status(404).json({
                message:"ngo not found"
            })
        }
        ngo.verificationStatus="Verified";
        ngo.verificationDocuments.forEach(doc=>{
            doc.verificationStatus="Verified"
        })
        await ngo.save();
        res.status(200).json({
            message:"ngo verified Successfully",ngo
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
const rejectNGO = async(req,res)=>{
    try{
        const ngo=await NGOProfile.findById(req.params.id);
        if(!ngo){
            return res.status(404).json({
                message:"ngo not found"
            })
        }
        ngo.verificationStatus="Rejected";
        ngo.verificationDocuments.forEach(doc=>{
            doc.verificationStatus="Rejected"
        })
        await ngo.save();
        res.status(200).json({
            message:"ngo rejected Successfully",ngo
        })
    }catch(error){
        res.status(500).json({
            message:"internal server error",
            error:error.message
        })
    }
}
module.exports={
    getDashboard,
    getAllRestaurants,
    getAllNGOs,
    verifyRestaurant,
    rejectRestaurant,
    verifyNGO,
    rejectNGO
}