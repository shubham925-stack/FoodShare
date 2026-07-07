const mongoose = require("mongoose");
const addressSchema=require("./schemas/Address");
const verificationDocumentSchema=require("./schemas/VerificationDocument");

const restaurantProfileSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            unique:true,
        },
        restaurantName:{
            type:String,
            required:true,
            trim:true,
        },
        restaurantType:{
            type:String,
            required:true,
            enum:[
                "Restaurant",
                "Hotel",
                "Bakery",
                "Cafe",
                "Cloud Kitchen",
                "Mess",
                "Caterer",
                "Other",
            ],
        },
        address:{
            type:addressSchema,
            required:true,
        },
        verificationDocuments:{
            type:[verificationDocumentSchema],
            required:true,
            validate:{
                validator: function(docs){
                    return docs.length>0;
                },
                message:"At least one verification document is required"
            },
        },
        verificationStatus:{
            type:String,
            enum:["Pending","Verified","Rejected"],
            default:"Pending"
        },
        acceptingDonations:{
            type:Boolean,
            default:true,
        },
    },
    {
        timestamps:true,
    }
);

module.exports=mongoose.model(
    "RestaurantProfile",
    restaurantProfileSchema
);