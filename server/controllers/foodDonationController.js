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
        const donations = await FoodDonation.find()
            .populate("restaurantId")
        res.status(200).json({
            message: "Food Donation Fetched Successfully", donations
        })
    } catch (error) {
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
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}
//updating claims
const claimFoodDonation = async (req, res) => {
    try {
        const { id } = req.params
        const { itemId, quantity } = req.body;
        if(!quantity||quantity<=0){
            return res.status(400).json({
                message:"quantity must be greater than0"
            })
        }
        const donation = await FoodDonation.findById(id);
        if (!donation) {
            return res.status(404).json({
                message: "Food donation not found"
            })
        }

        //NGO search
        const userId = req.user.id
        const ngo = await NGOProfile.findOne({userId});
        if (!ngo) {
            return res.status(404).json({
                message: "NGO not found"
            })
        }
        //Food item search
        const foodItem = donation.foodItems.id(itemId)
        if (!foodItem) {
            return res.status(404).json({
                message: "Food item not found"
            })
        }
        const availableQuantity =
            foodItem.totalQuantity - foodItem.claimedQuantity

        if (quantity > availableQuantity) {
            return res.status(400).json({
                message: "Not enough food available"
            })
        }
        //updating claimed history
        foodItem.claimedQuantity += quantity

        //save claim history

        await DonationClaim.create({
            donationId: donation._id,
            ngoId:ngo._id,
            itemId: foodItem.id,
            quantity
        })
        const allClaimed=donation.foodItems.every(
            item=>item.claimedQuantity===item.totalQuantity
        )
        const partiallyClaimed=donation.foodItems.some(
            item=>item.claimedQuantity>0
        )
        if(allClaimed){
            donation.donationStatus="Fully Claimed"
        }
        else if(partiallyClaimed){
            donation.donationStatus="Partially Claimed"
        }
        else{
            donation.donationStatus="Available"
        }
        await donation.save()

        res.status(200).json({
            message: "Food claimed successfully",
            donation
        })
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            error: error.message
        })
    }
}

const getNGODonations = async (req, res) => {
    try {
        const userId = req.user.id;
        const ngo = await NGOProfile.findOne({userId})
        if(!ngo){
            return res.status(404).json({
                message:"NGO profile not found"
            })
        }
        const claims = await DonationClaim.find({ ngoId:ngo._id })
            .populate({
                path: "donationId",
                populate: {
                    path: "restaurantId"
                }
            });
        res.status(200).json({
            message: "NGO donations fetched successfully",
            claims
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        });
    }
};

module.exports = {
    createFoodDonation,
    getAllFoodDonations,
    getRestaurantDonations,
    getFoodDonationById,
    updateFoodDonation,
    deleteFoodDonation,
    claimFoodDonation,
    getNGODonations
};