const mongoose = require("mongoose");

const claimedItemSchema= new mongoose.Schema(
    {
        itemId:{
            type:mongoose.Schema.Types.ObjectId,
            required:true,
        },
        quantityClaimed:{
            type:Number,
            required:true,
            min:1
        },
    },
    {
        _id:false
    }
)

module.exports=claimedItemSchema