const mongoose = require("mongoose");
const foodItemSchema = require("./schemas/FoodItem");

const foodDonationSchema = new mongoose.Schema(
    {
        restaurantId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"RestaurantProfile",
            required:true,
        },
        foodItems:{
            type:[foodItemSchema],
            required:true,
            validate:{
                validator:function(items){
                     return items.length>0;
                },
                message:"At least one food item is required",
            },
        },
        pickupStartTime:{
            type:Date,
            required:true,
        },
        pickupEndTime:{
            type:Date,
            required:true,
        },
        expiryTime:{
            type:Date,
            required:true,
        },

        donationStatus:{
            type:String,
            enum:[
                "Available",
                "Partially Claimed",
                "Fully Claimed",
                "Expired",
            ],
            default:"Available",
        },
        pickupInstructions:{
            type:String,
            trim:true,
            default:"",
        },
        isActive:{
            type:Boolean,
            default:true,
        },
    },
    {
        timestamps:true,
    },
);

module.exports=mongoose.model("FoodDonation", foodDonationSchema)