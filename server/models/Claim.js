const mongoose = require("mongoose");
const claimedItemSchema = require("./schemas/ClaimedItem");

const claimSchema = new mongoose.Schema(
    {
        donationId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"FoodDonation",
            required:true,
        },
        restaurantId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "RestaurantProfile",
            required: true,
        },

        ngoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "NGOProfile",
            required: true,
        },
        claimedItems:{
            type:[claimedItemSchema],
            required:true,
            validate:{
                validator:function(items){
                    return items.length>0;
                },
                message:"At least one claimed item is required",
            },
        },
        claimStatus:{
            type:String,
            enum:[
                "Pending",
                "Accepted",
                "Rejected",
                "Picked Up",
                "Completed",
                "Cancelled",
            ],
            default:"Pending",
        },
        pickupTime:{
            type:Date,
            default:null,
        },
        completionPhotos:[
            {
                imageUrl:{
                    type:String,
                    trime:true,
                },
            },
        ],
        completionNote:{
            type:String,
            trim:true,
            default:"",
        },
        restaurantFeedback:{
            rating:{
            type:Number,
            min:1,
            max:5,
        },
            review:{
            type:String,
            trim:true,
            default:"",
        },
        },
        voluteerFeedback:{
            rating:{
            type:Number,
            min:1,
            max:5,
        },
          review:{
            type:String,
            trim:true,
            default:"",
        },
        },
    },
    {
        timestamps:true,
    }
);

module.exports = mongoose.model("Claim",claimSchema);