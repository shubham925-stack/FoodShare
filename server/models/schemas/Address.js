const mongoose=require("mongoose");
const addressSchema = new mongoose.Schema(
    {
        addressLine:{
            type:String,
            required:true,
            trim:true,
        },
        landmark:{
            type:String,
            trim:true,
            default:"",
        },
        area:{
            type:String,
            required:true,
            trim:true,
        },
        pincode:{
            type:String,
            required:true,
            trim:true,
        },
        city:{
            type:String,
            required:true,
            trim:true,
        },
        state:{
            type:String,
            required:true,
            trim:true,
        },
        location:{
            type:{
                type:String,
                enum:["Point"],
                default:"Point"
            },
            coordinates:{
                type:[Number],
                required:true,
                validate:{
                    validator:function(value){
                        return value.length===2
                    },
                    message:"coordinates must contain longitude and latitude"
                }
            }
        }
    },
    {
        _id: false
    }
)

module.exports = addressSchema