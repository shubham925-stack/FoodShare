const mongoose = require("mongoose");
const donationClaimSchema = new mongoose.Schema(
    {
        donationId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "FoodDonation",
            required: true
        },
        ngoId: {
            type: mongoose.Schema.Types.ObjectId,
            ref:"NGOProfile",
            required:true
        },
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true
        },
        quantity:{
            type:Number,
            required:true,
            min:1
        },
        claimStatus:{
            type:String,
            enum:[
                "Pending",
                "Approved",
                "Rejected",
                "Picked Up"
            ],
            default:"Pending"
        }
    },
    {
        timestamps:true
    }
)

module.exports=mongoose.model(
    "DonationCLaim",donationClaimSchema
)