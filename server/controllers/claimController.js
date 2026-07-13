const Claim = require("../models/Claim");
const FoodDonation = require("../models/FoodDonation");
const RestaurantProfile = require("../models/RestaurantProfile");
const NGOProfile = require("../models/NGOProfile");

const createClaim = async (req, res) => {
    try {
        const { id } = req.params;
        const { itemId, quantity } = req.body;

        if (!quantity || quantity <= 0) {
            return res.status(400).json({
                message: "Quantity must be greater than 0"
            });
        }
        const donation = await FoodDonation.findById(id);
        if (!donation) {
            return res.status(404).json({
                message: "Food donation not found"
            });
        }
        const userId = req.user.id;
        const ngo = await NGOProfile.findOne({ userId });
        if (!ngo) {
            return res.status(404).json({
                message: "NGO profile not found"
            });
        }
        const foodItem = donation.foodItems.id(itemId);

        if (!foodItem) {
            return res.status(404).json({
                message: "Food item not found"
            });
        }
        const availableQuantity =
            foodItem.totalQuantity - foodItem.claimedQuantity;
        if (quantity > availableQuantity) {
            return res.status(400).json({
                message: "Not enough quantity available"
            });
        }
        const claim = await Claim.create({
            donationId: donation._id,
            restaurantId: donation.restaurantId,
            ngoId: ngo._id,
            claimedItems: [
                {
                    itemId: foodItem._id,
                    quantityClaimed: quantity,
                },
            ],
        });
        res.status(201).json({
            message: "Claim request sent successfully",
            claim,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
const getRestaurantClaims = async (req, res) => {
    try {
        const userId = req.user.id;
        const restaurant = await RestaurantProfile.findOne({ userId });
        if (!restaurant) {
            return res.status(404).json({
                message: "Restaurant profile not found"
            });
        }
        const claims = await Claim.find({
            restaurantId: restaurant._id
        })
            .populate("ngoId")
            .populate("donationId");
        res.status(200).json({
            message: "Restaurant claims fetched successfully",
            claims,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const getNGOClaims = async (req, res) => {
    try {
        const userId = req.user.id;

        const ngo = await NGOProfile.findOne({ userId });
        if (!ngo) {
            return res.status(404).json({
                message: "NGO profile not found"
            });
        }
        const claims = await Claim.find({
            ngoId: ngo._id
        })
            .populate({
                path: "donationId",
                populate: {
                    path: "restaurantId"
                }
            });
        res.status(200).json({
            message: "NGO claims fetched successfully",
            claims,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const acceptClaim = async (req, res) => {
    try {
        const claim = await Claim.findById(req.params.id);
        if (!claim) {
            return res.status(404).json({
                message: "Claim not found"
            });
        }
        if (claim.claimStatus !== "Pending") {
            return res.status(400).json({
                message: "Claim already processed"
            });
        }
        const donation = await FoodDonation.findById(claim.donationId);
        if (!donation) {
            return res.status(404).json({
                message: "Donation not found"
            });
        }
        for (const claimedItem of claim.claimedItems) {
            const foodItem = donation.foodItems.id(claimedItem.itemId);
            if (!foodItem) continue;
            foodItem.claimedQuantity += claimedItem.quantityClaimed;
        }
        const allClaimed = donation.foodItems.every(
            item => item.claimedQuantity === item.totalQuantity
        );
        const partiallyClaimed = donation.foodItems.some(
            item => item.claimedQuantity > 0
        );
        if (allClaimed) {
            donation.donationStatus = "Fully Claimed";
        }
        else if (partiallyClaimed) {
            donation.donationStatus = "Partially Claimed";
        }
        else {
            donation.donationStatus = "Available";
        }
        await donation.save();
        claim.claimStatus = "Accepted";
        await claim.save();
        res.status(200).json({
            message: "Claim accepted successfully",
            claim,
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};
const rejectClaim = async (req, res) => {
    try {

        const claim = await Claim.findById(req.params.id);

        if (!claim) {
            return res.status(404).json({
                message: "Claim not found"
            });
        }

        claim.claimStatus = "Rejected";

        await claim.save();

        res.status(200).json({
            message: "Claim rejected successfully",
            claim,
        });

    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            error: error.message,
        });
    }
};

const markAsPickedUp = async(req,res)=>{
    try{
        const claim = await Claim.findById(req.params.id);

        if(!claim){
            return res.status(404).json({
                message:"Claim not found"
            })
        }
        if(claim.claimStatus !== "Accepted"){
            return res.status(404).json({
                message : "Only accepted claims can be marked as picked up"
            })
        }
        claim.claimStatus="Picked Up"
        claim.pickedUpAt = new Date();
        await claim.save();
        
        return res.status(200).json({
            message:"Donation marked as picked up",
            claim
        });
    }catch(error){
        res.status(500).json({
            message : "Internal sever error",
            error : error.message
        })
    }
}

module.exports = {
    createClaim,
    getRestaurantClaims,
    getNGOClaims,
    acceptClaim,
    rejectClaim,
    markAsPickedUp
};