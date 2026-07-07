const mongoose = require("mongoose");

const foodItemSchema= new mongoose.Schema(
    {
        // itemId:{
        //     type: mongoose.Schema.Types.ObjectId,
        //     auto:true
        // },

        foodName:{
            type:String,
            required:true,
            trim:true
        },
        category:{
            type:String,
            required:true,
        },
        foodType:{
            type:String,
            required:true,
            enum:["Veg","Non-Veg","Vegan","Jain"]
        },
        unit:{
            type:String,
            required:true,
            enum:[
                "Plates",
                "pieces",
                "Kg",
                "Grams",
                "Liters",
                "Ml",
                "Packets",
                "Bowls",
                "Boxes",
                "Other"
            ],
        },
        totalQuantity:{
            type:Number,
            required:true,
            min:1
        },
        claimedQuantity:{
            type:Number,
            default:0,
            min:0,
            validate:{
                validator:function(value){
                    return value<=this.totalQuantity
                },
                message:"claimed quantity cannot exceed total quantity"
            }
        },
        description:{
            type:String,
            trim:true,
            default:""
        }
    },
    // {
    //     _id:false,
    // }
)

module.exports=foodItemSchema;