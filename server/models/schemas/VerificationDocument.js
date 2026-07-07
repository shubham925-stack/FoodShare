const mongoose = require("mongoose")

const verificationDocumentSchema= new mongoose.Schema(
    {
        documentType:{
            type:String,
            required:true,
            enum:[
                "Government ID",
                "Buisness Document",
                "Registration Certificate",
                "Restaurant Photo",
                "Profile Photo"
            ],
            trim: true
        },
        documentNumber:{
            type:String,
            trim:true,
            default:"",
        },
        // file:{
        //     url:{
        //         type:String,
        //         required:true,
        //         trim:true,
        //     },

        //     fileName:{
        //         type:String,
        //         required:true,
        //         trim:true,
        //     },
        //     mimeType:{
        //         type:String,
        //         required:true,
        //         trim:true,
        //     },
        //     fileSize:{
        //         type:Number,
        //         required:true
        //     },
        // },
        verificationStatus:{
            type:String,
            enum:["Pending","Verified","Rejected"],
            default:"Pending"
        },
        remarks:{
            type:String,
            trim:true,
            default:"",
        },
        uploadedAt:{
            type:Date,
            default:Date.now,
        },
        verifiedBy:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User",
            default:null
        },
        verifiedAt:{
            type: Date,
            default: null
        }
    },
    {
        _id:false,
    }
);

module.exports=verificationDocumentSchema;