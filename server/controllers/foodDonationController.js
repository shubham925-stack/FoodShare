const FoodDonation = require("../models/FoodDonation");
const RestaurantProfile = require("../models/RestaurantProfile");
const foodItemSchema = require("../models/schemas/FoodItem");
const DonationClaim = require("../models/DonationClaim")
const NGOProfile = require("../models/NGOProfile")

//creating donations
const createFoodDonation = async (req, res) => {
    try {
        const {
            // restaurantId,
            foodItems,
            pickupStartTime,
            pickupEndTime,
            expiryTime,
            pickupInstructions
        } = req.body;
        const userId=req.user.id

        const restaurant = await RestaurantProfile.findOne({
            userId:userId
        })
        ;
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant profile not found"
            })
        }
        const donation = await FoodDonation.create({
            restaurantId:restaurant._id,
            foodItems,
            pickupStartTime,
            pickupEndTime,
            expiryTime,
            pickupInstructions
        })
        res.status(201).json({
            message: "Food donation created successfully",donation
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
//get all donations

const getAllFoodDonations = async (req, res) => {
    try {
        console.log(req.query)
        const { foodName, foodType, city } = req.query;
        const query = {};

        if(foodName){
            query["foodItems.foodName"]={
                $regex: foodName,
                $options: "i",
            };
        };

        if(foodType){
            query["foodItems.foodType"]=foodType;
        };
        let donations = await FoodDonation.find(query)
        .populate("restaurantId");
        
        const currentTime = new Date();
        for(const donation of donations){
            if(
                donation.expiryTime < currentTime &&
                donation.donationStatus !== "Expired"
            ){
                donation.donationStatus = "Expired";
                await donation.save();
            }
        }
        donations = donations.filter(
            donation => donation.donationStatus!=="Expired"
        )

        if(city){
            donations=donations.filter(
                (donation)=>{
                    return(
                        donation.restaurantId?.address?.city?.toLowerCase()===city.toLowerCase()
                    )
                }
            )
        }
        res.status(200).json({
            message: "Food Donations fetched successfully",
            donations,
        })
    } catch (error) {
        console.error(error)
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
//donations posted by a restaurant
const getRestaurantDonations = async (req, res) => {
    try {
        const userId = req.user.id;

        const restaurant = await RestaurantProfile.findOne({userId});

        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant not found"
            });
        }
        const donations = await FoodDonation.find({ 
            restaurantId:restaurant._id 
        }).populate("restaurantId")
        res.status(200).json({
            message: "Restaurant donation fetched successfully", donations
        })
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}
//get individual donation
const getFoodDonationById = async (req, res) => {
    try {
        const { donationId } = req.params
        const donation = await FoodDonation.findById(donationId)
            .populate("restaurantId")

        if (!donation) {
            return res.status(404).json({
                message: "Food donation not found"
            })
        }
        res.status(200).json({
            message: "Food donation fetched successfully", donation
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
//update donations
const updateFoodDonation = async (req, res) => {
    try {
        const userId = req.user.id
        const restaurant=await RestaurantProfile.findOne({userId})
        if(!restaurant){
            return res.status(404).json({
                message:"Restaurant profile not found"
            })
        }
        const donation = await FoodDonation.findOneAndUpdate(
            {_id:req.params.id,
             restaurantId:restaurant._id                
            },
            req.body,
            {
                new: true,
                runValidators: true
            }
        ).populate("restaurantId")
        if (!donation) {
            return res.status(404).json({
                message: "Food donation not found"
            });
        }
        res.status(200).json({
            message: "food donation updated successfully", donation
        });
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
//delete donations
const deleteFoodDonation = async (req, res) => {
    try {
        const userId = req.user.id
        const restaurant=await RestaurantProfile.findOne({userId})
        if(!restaurant){
            return res.status(404).json({
                message:"Restaurant profile not found"
            })
        }
        const donation = await FoodDonation.findOneAndDelete({
            _id:req.params.id,
            restaurantId:restaurant._id
        });
        if (!donation) {
            return res.status(404).json({
                message: "Food donation not found"
            })
        }
        res.status(200).json({
            message: "Food donation deleted successfully"
        })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}


module.exports = {
    createFoodDonation,
    getAllFoodDonations,
    getRestaurantDonations,
    getFoodDonationById,
    updateFoodDonation,
    deleteFoodDonation,
};