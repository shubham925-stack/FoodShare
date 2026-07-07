const mongoose = require("mongoose");
const addressSchema = require("./schemas/Address");
const verificationDocumentSchema = require("./schemas/VerificationDocument");

const volunteerProfileSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            unique:true,
        },
        address:{
            type: addressSchema,
            required:true
        },
        vehicleType:{
            type:String,
            required:true,
            enum:[
                "Walking",
                "Cycle",
                "Bike",
                "Scooter",
                "Car",
                "Van",
                "Other"
            ],
        },
        isAvailabe:{
            type:Boolean,
            defauklt:true
        },
        verificationDocuments:{
            type:[verificationDocumentSchema],
            required:true,
            validate:{
                validator:function(docs){
                    return docs.length>0;
                },
                message:"At least one verification document is required"
            },
        },
    },
    {
        timestamps:true
    }
);
module.exports=mongoose.model("VolunteerProfile", volunteerProfileSchema);