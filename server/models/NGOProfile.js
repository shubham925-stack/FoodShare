const mongoose = require("mongoose");
const addressSchema = require("./schemas/Address");
const verificationDocumentSchema = require("./schemas/VerificationDocument");


const ngoProfileSchema = new mongoose.Schema(
    {
        userId:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            required:true,
            unique:true,
        },
        ngoName:{
            type:String,
            trim:true,
            required:true,
        },
        address:{
            type:addressSchema,
            required:true,
        },
        backupContact:{
            name:{
                type:String,
                required:true,
                trim:true,
            },
            phone:{
                type:String,
                required:true,
                trim:true,
            },
        },
        verificationDocuments:{
            type:[verificationDocumentSchema],
            required:true,
            validate:{
                validator:function(docs){
                    return docs.length>0;
                },
                message:"At least one verification document is required."
            },
        },
        verificationStatus: {
           type: String,
           enum: ["Pending", "Verified", "Rejected"],
           default: "Pending"
},
    },
    {
        timestamps:true,
    },
);

module.exports=mongoose.model("NGOProfile",ngoProfileSchema);